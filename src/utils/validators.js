export function validateTitle(value) {
  const regex = /^[a-zA-Z0-9 ]{3,}$/
  if (!value.trim()) return 'Title is required'
  if (!regex.test(value.trim())) return 'Title must be at least 3 characters (letters, numbers, spaces only)'
  return ''
}

export function validateDescription(value) {
  if (!value.trim()) return 'Description is required'
  if (value.trim().length < 10) return 'Description must be at least 10 characters long'
  return ''
}

export function validateDate(value) {
  if (!value) return 'Date is required'
  return ''
}

export function validateCategory(value) {
  const regex = /^[a-zA-Z ]+$/
  if (!value.trim()) return 'Category is required'
  if (!regex.test(value.trim())) return 'Category must contain only letters and spaces'
  return ''
}

export function validateEmail(value) {
  const regex = /^[a-zA-Z0-9._%+-]+@(pilani|goa|hyderabad)\.bits-pilani\.ac\.in$/
  if (!value.trim()) return 'Email is required'
  if (!regex.test(value.trim())) return 'Must be a valid BITS email (e.g. f20230123@pilani.bits-pilani.ac.in)'
  return ''
}

export function validateBitsId(value) {
  const singliiteRegex = /^\d{4}[A-Z]\d[A-Z]{2}\d{4}[PGH]$/
  const dualiiteRegex = /^\d{4}[A-Z]\d[A-Z]\d[A-Z]{2}\d{4}[PGH]$/
  if (!value.trim()) return 'BITS ID is required'
  if (!singliiteRegex.test(value.trim()) && !dualiiteRegex.test(value.trim())) {
    return 'Must be a valid BITS ID (e.g. 2023A1PS0123P or 2023A4B4PS0123G)'
  }
  return ''
}
