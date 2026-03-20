import { seededResourceEntries, type ResourceCollectionKey, type ResourceEntry } from '../data/resourceLibrary'

const STORAGE_KEY = 'zamai-community-submissions-v1'

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

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

export function getCommunitySubmissions(): CommunitySubmission[] {
  if (!canUseStorage()) {
    return []
  }

  const rawValue = window.localStorage.getItem(STORAGE_KEY)
  if (!rawValue) {
    return []
  }

  try {
    return JSON.parse(rawValue) as CommunitySubmission[]
  } catch {
    return []
  }
}

function saveCommunitySubmissions(submissions: CommunitySubmission[]) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions))
}

export function createCommunitySubmission(draft: CommunitySubmissionDraft): CommunitySubmission {
  const submission: CommunitySubmission = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...draft,
  }

  const submissions = getCommunitySubmissions()
  saveCommunitySubmissions([submission, ...submissions])
  return submission
}

export function updateSubmissionStatus(id: string, status: SubmissionStatus, editorialNotes?: string) {
  const nextSubmissions = getCommunitySubmissions().map((submission) =>
    submission.id === id
      ? {
          ...submission,
          status,
          editorialNotes,
        }
      : submission,
  )

  saveCommunitySubmissions(nextSubmissions)
}

export function getApprovedEntries(collection: ResourceCollectionKey): ResourceEntry[] {
  return getCommunitySubmissions()
    .filter((submission) => submission.collection === collection && submission.status === 'approved')
    .map((submission) => ({
      id: submission.id,
      collection: submission.collection,
      title: submission.title,
      titlePashto: submission.titlePashto,
      summary: submission.summary,
      body: submission.body,
      tags: submission.tags,
      region: submission.region,
      contributor: submission.contributor,
      verificationStatus: 'community-approved',
    }))
}

export function getVisibleEntries(collection: ResourceCollectionKey): ResourceEntry[] {
  return [...seededResourceEntries[collection], ...getApprovedEntries(collection)]
}

export function getPendingSubmissionCount() {
  return getCommunitySubmissions().filter((submission) => submission.status === 'pending').length
}