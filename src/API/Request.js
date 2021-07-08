const data = {
    "data": [
        {
            "user_id": "f97cb2a2",
            "user_name": "John Doe",
            "email": "john@doe-club.org",
            "score": 12,
            "registered": "2021-06-23T06:32:23+00:00"
        },
        {
            "user_id": "280ae5cb",
            "user_name": "Jane Monroe",
            "score": 8,
            "email": "jane@monroe.com",
            "registered": "2021-07-01T13:26:07+00:00"
        },
        {
            "user_id": "280ae5cc",
            "user_name": "Cari Stacey",
            "score": 1,
            "email": "cari.stacey@reactdev.io",
            "registered": "2021-05-12T23:59:22+00:00"
        }
    ]
}

const error = {
    "message": "Something went wrong :(",
    "data": []
}

const expectError = false
export const getData = new Promise((resolve, reject) => {
    setTimeout(() => {
        if(expectError) return reject(error)
        resolve(data);
    }, 1500);
})
