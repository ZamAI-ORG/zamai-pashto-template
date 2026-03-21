import { seededResourceEntries, type ResourceCollectionKey, type ResourceEntry } from '../data/resourceLibrary'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'
const EDITOR_TOKEN_KEY = 'zamai-editor-token-v1'

export type SubmissionStatus = 'pending' | 'approved' | 'rejected'

export interface CommunitySubmission {
  id: string
  collection: ResourceCollectionKey
  title: string
  titlePashto?: string
  summary: string
  body: string
  contributor?: string
  region?: string
  tags: string[]
  createdAt: string
  status: SubmissionStatus
  editorialNotes?: string
}

export interface CommunitySubmissionDraft {
  collection: ResourceCollectionKey
  title: string
  titlePashto?: string
  summary: string
  body: string
  contributor?: string
  region?: string
  tags: string[]
}

export interface EditorSession {
  email: string
}

export interface ApprovedExportResult {
  exportedAt: string
  path: string
  count: number
}

export interface ApprovedImportResult {
  importedCount: number
  totalApproved: number
  path: string
}

async function requestJson<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  const headers = new Headers(init.headers)

  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  })

  const responseText = await response.text()
  const responseData = responseText ? JSON.parse(responseText) : null

  if (!response.ok) {
    throw new Error(responseData?.message ?? 'Request failed.')
  }

  return responseData as T
}

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function emitEditorAuthChanged() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event('zamai-editor-auth-changed'))
}

export function getStoredEditorToken() {
  if (!canUseStorage()) {
    return null
  }

  return window.localStorage.getItem(EDITOR_TOKEN_KEY)
}

export function saveEditorToken(token: string) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(EDITOR_TOKEN_KEY, token)
  emitEditorAuthChanged()
}

export function clearEditorToken() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(EDITOR_TOKEN_KEY)
  emitEditorAuthChanged()
}

export async function createCommunitySubmission(draft: CommunitySubmissionDraft): Promise<CommunitySubmission> {
  return requestJson<CommunitySubmission>('/submissions', {
    method: 'POST',
    body: JSON.stringify(draft),
  })
}

export async function getCommunitySubmissions(token: string): Promise<CommunitySubmission[]> {
  return requestJson<CommunitySubmission[]>('/admin/submissions', {}, token)
}

export async function updateSubmissionStatus(
  id: string,
  status: SubmissionStatus,
  editorialNotes: string | undefined,
  token: string,
) {
  return requestJson<CommunitySubmission>(`/admin/submissions/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ status, editorialNotes }),
  }, token)
}

export async function getVisibleEntries(collection: ResourceCollectionKey): Promise<ResourceEntry[]> {
  try {
    const approvedEntries = await requestJson<ResourceEntry[]>(`/resources/${collection}`)
    return [...seededResourceEntries[collection], ...approvedEntries]
  } catch {
    return seededResourceEntries[collection]
  }
}

export async function loginEditor(email: string, password: string) {
  return requestJson<{ token: string, editor: EditorSession }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function getEditorSession(token: string) {
  const response = await requestJson<{ editor: EditorSession }>('/auth/session', {}, token)
  return response.editor
}

export async function exportApprovedEntries(token: string) {
  return requestJson<ApprovedExportResult>('/admin/export-approved', {
    method: 'POST',
  }, token)
}

export async function importApprovedEntries(token: string) {
  return requestJson<ApprovedImportResult>('/admin/import-approved', {
    method: 'POST',
  }, token)
}