<template>
        <!-- <form @submit.prevent="submit(form)" method="POST" class="mail-form">
            <input type="email" name="mailing" id="mailing" placeholder="ВВЕДИТЕ СВОЙ EMAIL"
            v-model="form.email" @keypress.enter.prevent="toSent($event)">
            <button class="mail-btn" type="submit">{{ sendOrSent.text }}</button>
        </form> -->
    <newsletter-form 
        class="mail-form"
        headerText=""
        inputPlaceholder="ВВЕДИТЕ СВОЙ EMAIL"
    />    
</template>

<script setup>
    const form = ref({
        email: ''
    })

    async function submit(form){
        const result = await useNewsletterSubscribe(form.email)

        console.log(result) // Email ${email} added to subscribers
        // if (form.email.length >= 7 && form.email.includes('@')) {
        //     const apiKey = process.env.MAILAPI;
        //     const audienceId = process.env.MAILLISTID;
        //     const url = `https://us8.api.mailchimp.com/3.0/lists/${audienceId}/members`;

        //     const formData = {
        //         email_address: form.email,
        //         status: 'subscribed',
        //     };

        //     try {
        //         const response = await fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             Authorization: `Basic ${btoa(`anystring:${apiKey}`)}`,
        //         },
        //         body: JSON.stringify(formData),
        //         });

        //         if (response.ok) {
        //             // Успешно подписано
        //             console.log('Вы успешно подписались на рассылку Mailchimp.');
        //             // Очистить поле email после успешной подписки
        //             this.form.email = '';
        //         } else {
        //             // Обработка ошибок при подписке
        //             console.error('Ошибка при подписке на рассылку Mailchimp.');
        //         }
        //     } catch (error) {
        //         console.error('Произошла ошибка при отправке запроса к Mailchimp:', error);
        //     }
            
            this.sendOrSent.text='ПОДПИСКА ОФОРМЛЕНА!';
            this.sendOrSent.text='ПОДПИСКА ОФОРМЛЕНА!';
        // }
    }

</script>


<style>
    /* MAILING */

    .mailing {
        margin: 75px auto;
        padding: 55px 30px 55px 15%;
        overflow: hidden;
        border-radius: 20px;
        background: #00BA61;
        box-shadow: 0px 10px 10px 0px rgba(255, 255, 255, 0.46) inset;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 30px;
        position: relative;
    }

    .mailing::before {
        content: url('~/assets/back/back-mail.png');
        position: absolute;
        left: -5px;
        top: 0;
    }

    .mailing h3 {
        font-size: 32px;
        color: #f1f1f1;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.37);
        z-index: 2;
    }

    .mail-form {
        width: 94%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mail-form input {
        width: 50%;
        padding: 15px 25px;
        background-color: #f1f1f1;
        font-size: 18px;
        border: none;
        border-radius: 10px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.13) inset;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    }

    .mail-form button {
        width: 48%;
        padding: 15px 0;
        border-radius: 10px;
        cursor: pointer;
        color: #f1f1f1;
        font-size: 20px;
        letter-spacing: 2px;
        word-spacing: 3px;
        border: none;
        box-shadow: 0px 4px 4px 0px rgba(255, 255, 255, 0.43) inset;
        background-color: rgb(19, 19, 19);
    }

    .mail-form button:hover {
        filter: brightness(90%);
    }

    .mail-form button:active {
        transform: scale(0.98, 0.98);
    }


    @media (max-width: 1130px) {
        .mail-form {
            flex-direction: column;
            gap: 15px;
        }

        .mail-form input,
        .mail-form button {
            width: 90%;
        }
    }

    @media (max-width: 845px) {
        .mail-form input,
        .mail-form button {
            font-size: 14px;
            padding: 0.8em;
        }
    }

    @media (max-width: 445px) {
        .mail-form input,
        .mail-form button {
            font-size: 12px;
            padding: 0.8em;
        }
    }

    @media (max-width: 400px) {
        .mail-form,
        .mail-form button {
            width: 95%;
            font-size: 10px;
        }
    }

</style>