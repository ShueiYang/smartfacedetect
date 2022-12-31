
const { REACT_APP_BASE_URL } = process.env;

async function httpGetUser() {
    return await fetch(`${REACT_APP_BASE_URL}/auth/login`, {
        credentials: "include",
      })
};


async function httpGetProfile(userEmail) {
    const resp = await fetch(`${REACT_APP_BASE_URL}/auth/profile`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          email: userEmail
        })
      })
    return await resp.json();
}

async function imageApiCall(imageUrl) {
    return await fetch(`${REACT_APP_BASE_URL}/api/imageurl`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            input: imageUrl
        })
    })
}

async function submitMeter(userID) {
    const resp = await fetch(`${REACT_APP_BASE_URL}/api/image`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
          id: userID
        })
      })
    return await resp.json();
}

export {
    httpGetUser,
    httpGetProfile,
    imageApiCall,
    submitMeter,
};