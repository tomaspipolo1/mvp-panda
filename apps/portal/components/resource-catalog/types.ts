export type ResourceIconKey =
  | "dollar-sign"
  | "file-text"
  | "shield"
  | "book-open"
  | "building-2"
  | "package"
  | "truck"
  | "landmark"
  | "scale"
  | "hard-hat"
  | "wrench"
  | "clipboard-list"

export interface ResourceFileData {
  title: string
  fileName: string
  fileSize: string
  fileDate: string
  fileUrl: string
}

export interface ResourceCategoryItem {
  id: string
  icon: ResourceIconKey
  title: string
  description: string
  file: ResourceFileData
}

export interface ResourceCategoryFormValues {
  icon: ResourceIconKey
  title: string
  description: string
  fileTitle: string
  selectedFile: File | null
}
