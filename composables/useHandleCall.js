export const useHandleCall = async (userMessage) => {
    try {
        const response = await $fetch('/api/send-message', {
            method: 'POST',
            body: { userMessage },
        });
        console.log('Message sent:', response);
        return response.ok
    } catch (error) {
        console.error('Error sending message:', error);
    }

}