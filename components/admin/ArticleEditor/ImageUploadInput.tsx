/**
 * Image Upload Input Component
 * Uploads images to /api/admin/upload and returns URL
 */

'use client';

import { useState, useRef, ChangeEvent } from 'react';
import styles from './ImageUploadInput.module.css';

interface ImageUploadInputProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadState {
  status: UploadStatus;
  error?: string;
  filename?: string;
  fileSize?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export default function ImageUploadInput({
  value,
  onChange,
  label = 'Ảnh đại diện',
  required = false,
}: ImageUploadInputProps) {
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Client-side validation
    if (!ALLOWED_TYPES.includes(file.type)) {
      setUploadState({
        status: 'error',
        error: 'File không hợp lệ. Chỉ chấp nhận JPG, PNG, WebP và GIF.',
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setUploadState({
        status: 'error',
        error: 'File quá lớn. Kích thước tối đa là 5MB.',
      });
      return;
    }

    // Upload
    setUploadState({ status: 'uploading' });

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadState({
          status: 'success',
          filename: file.name,
          fileSize: file.size,
        });
        onChange(data.url);
      } else {
        setUploadState({
          status: 'error',
          error: data.error || 'Upload thất bại',
        });
      }
    } catch (error) {
      setUploadState({
        status: 'error',
        error: 'Lỗi mạng. Vui lòng thử lại.',
      });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRetry = () => {
    setUploadState({ status: 'idle' });
    handleUploadClick();
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileSelect}
        className={styles.hiddenInput}
      />

      {/* Idle State */}
      {uploadState.status === 'idle' && !value && (
        <button type="button" onClick={handleUploadClick} className={styles.uploadButton}>
          📷 Chọn ảnh
        </button>
      )}

      {/* Uploading State */}
      {uploadState.status === 'uploading' && (
        <div className={styles.uploadingState}>
          <span className={styles.spinner}>⏳</span>
          <span>Đang tải lên...</span>
        </div>
      )}

      {/* Error State */}
      {uploadState.status === 'error' && (
        <div className={styles.errorState}>
          <p className={styles.errorMessage}>❌ {uploadState.error}</p>
          <button type="button" onClick={handleRetry} className={styles.retryButton}>
            Thử lại
          </button>
        </div>
      )}

      {/* Success State or Existing Value */}
      {(uploadState.status === 'success' || value) && (
        <div className={styles.successState}>
          {value && (
            <>
              <img src={value} alt="Preview" className={styles.preview} />
              <div className={styles.fileInfo}>
                {uploadState.filename && (
                  <>
                    <span className={styles.filename}>✓ {uploadState.filename}</span>
                    {uploadState.fileSize && (
                      <span className={styles.fileSize}>({formatFileSize(uploadState.fileSize)})</span>
                    )}
                  </>
                )}
              </div>
            </>
          )}
          <button type="button" onClick={handleUploadClick} className={styles.changeButton}>
            🔄 Thay đổi
          </button>
        </div>
      )}
    </div>
  );
}
