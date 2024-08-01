
export const useHandleSubmit = (obj) => {

    fetch('https://formsubmit.co/ajax/vyacheslavovna.an@mail.ru', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(obj),
    });

    if (response.ok) {
        const data = response.json();
        console.log('Успешно отправлено:', data);
    } else {
        console.error('Ошибка отправки:', response.status);
    }

    return { response }
}