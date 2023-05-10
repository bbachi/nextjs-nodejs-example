export async function getAllUsers() {

    const response = await fetch('/api/users');
    return await response.json();
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

export async function createPayment() {
    const response = await fetch(`/api/create-checkout-session`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      })
    return await response.json();
}