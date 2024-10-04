export const useBD = async () => {
    try {
        const response = await $fetch('/api/bd', {
            method: 'GET'
        });
        // console.log('Message sent:', response);
        return response
    } catch (error) {
        console.error('Error sending message:', error);
    }

}