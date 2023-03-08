import { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Dragger from './dragger'
import UploadList from './uploadList'
import Transition from '../Transition'
export type fileStatusType = 'ready' | 'uploading' | 'success' | 'error' | 'cancel'

export type UploadFile = {
    uid: string
    size: number
    name: string
    status: fileStatusType
    raw: File
    percent?: number
    success?: any
    error?: any
    thumbUrl?: string
    crossOrigin?: 'anonymous' | 'use-credentials' | ''
}

export interface UploadProps {
    action: string
    defaultFileList?: UploadFile[]
    onProgress?: (percent: number, file: UploadFile) => void
    onSuccess?: (data: any, file: UploadFile) => void
    onError?: (error: any, file: UploadFile) => void
    requestHttp?: () => void
    beforeUpload?: (file: File) => boolean | Promise<File>
    onChange?: (file: File) => void
    onRemove?: (file: UploadFile) => void
    name?: string
    children?: React.ReactNode
    drag?: boolean
    // 参数
    data?: Record<string, any>
    withCredentials?: boolean
    accept?: string
    multiple?: boolean
}

let id: number = 0
const Upload: FC<UploadProps> = props => {
    const {
        action,
        onProgress,
        onSuccess,
        onError,
        beforeUpload,
        onChange,
        onRemove,
        children,
        drag,
        name,
        data,
        accept,
        multiple,
    } = props

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([])

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files

        if (files) {
            await uploadFiles(files)
            // clear
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const updateFileList = (fileTarget: UploadFile | null, fileParams: Partial<UploadFile>) => {
        setFileList((preFileList: UploadFile[]) => {
            return preFileList.map(file => {
                if (fileTarget === null || file.uid === fileTarget.uid) {
                    return {
                        ...file,
                        ...fileParams,
                    }
                } else {
                    return file
                }
            })
        })
    }

    const uploadFiles = async (files: FileList) => {
        if (!files) {
            return
        }
        let fileList = Array.from(files)

        fileList.forEach(async file => {
            // beforeUpload
            if (beforeUpload) {
                const res = beforeUpload(file)

                // boolean
                if (!res) {
                    return
                }
                // promise
                if (res instanceof Promise) {
                    file = await res
                }
            }
            postFile(file)
        })
    }

    // upload file
    const postFile = (file: File) => {
        let _file: UploadFile = {
            uid: 'upload-file-uid-' + id++,
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        }

        setFileList(prevList => {
            return [_file, ...prevList]
        })

        const formData = new FormData()
        formData.append(name!, file)

        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value)
            })
        }

        axios
            .post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress(e) {
                    const percentage = Math.round((e.loaded * 100) / e.total) || 0

                    if (percentage < 100) {
                        updateFileList(_file, {
                            status: 'uploading',
                            percent: percentage,
                        })

                        onProgress?.(percentage, _file)
                    }
                },
            })
            .then(res => {
                updateFileList(_file, {
                    status: 'success',
                    success: res.data,
                })
                onSuccess?.(res.data, _file)
            })
            .catch(err => {
                updateFileList(_file, {
                    status: 'error',
                    error: err,
                })
                onError?.(err, _file)
            })
        onChange?.(file)
    }

    const handleRemove = (file: UploadFile) => {
        setFileList(preList => preList.filter(item => item.uid !== file.uid))
        onRemove?.(file)
    }

    return (
        <div className="upload-component">
            <div onClick={handleClick} className="upload-input" style={{ display: 'inline-block' }}>
                {drag ? (
                    <Dragger
                        onFile={files => {
                            uploadFiles(files)
                        }}
                    >
                        {children}
                    </Dragger>
                ) : (
                    children
                )}
                <input
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    className="file-input"
                    type="file"
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>

            <Transition in={!!fileList?.length} timeout={200}>
                <UploadList fileList={fileList} onRemove={handleRemove} />
            </Transition>
        </div>
    )
}

Upload.defaultProps = {
    name: 'file',
    multiple: false,
}

export default Upload
