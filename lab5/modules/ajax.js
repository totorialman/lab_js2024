class Ajax {
    post(url, callback) {
        let xhr = new XMLHttpRequest()
        xhr.open('POST', url)
        xhr.send()

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const data = JSON.parse(xhr.response)
                callback(data)
            }
        }
    }
}

export const ajax = new Ajax();


    export const getDataFromServer = async (url, callback) => {
        try {
            const response = await fetch(url);
            
            if (response.ok) {
                const data = await response.json();
                callback(data);
            } else {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
        } catch (error) {
            console.error(error);
        }
 }


