export async function checkEligibility_createDiscussion(edit, setState) {
    const api = await fetch(`/api/check_eligibility/create_discussion?edit=${edit}`)
    const response = await api.json()
    if (response?.confirmation) {
        setState(null)
        return true
    } else {
        setState(response?.message)
        return false
    }
}