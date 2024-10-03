export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { userMessage } = body;

    const telegramToken = process.env.NUXT_PUBLIC_TELEGRAM_BOT_TOKEN; // Храни токен в переменных окружения
    const chatId = process.env.NUXT_PUBLIC_TELEGRAM_PRIVET_ID;
    const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

    const response = await $fetch(url, {
        method: 'POST',
        body: {
            chat_id: chatId,
            text: userMessage,
        },
    });

    return response;
});