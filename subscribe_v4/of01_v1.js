document.addEventListener('DOMContentLoaded', function () {
    const radioOptions = document.querySelectorAll('.radio-option, .card-type');

    radioOptions.forEach(option => {
        option.addEventListener('click', function (e) {
            // 防止事件冒泡
            e.stopPropagation();

            const radio = this.querySelector('input[type="radio"]');
            if (radio && !radio.checked) {
                radio.checked = true;
                // 觸發 change 事件
                radio.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });

        // 防止點擊 radio 或 label 時重複觸發
        const radio = option.querySelector('input[type="radio"]');
        const label = option.querySelector('label');

        if (radio) {
            radio.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }

        if (label) {
            label.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    });

    const planRadios = document.querySelectorAll('input[name="subscribe-plan"]');
    const deliveryRadios = document.querySelectorAll('input[name="delivery"]');
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const postageText = document.getElementById('postage-text');
    const totalPrice = document.getElementById('total-price');
    const remittanceAmount = document.getElementById('remittance-amount');
    const orderAmount = document.getElementById('order-amount');
    const bankTransferSection = document.getElementById('bank-transfer-section');
    const creditCardSection = document.getElementById('credit-card-section');

    function calculateTotal() {
        let total = 0;
        const selectedPlan = document.querySelector('input[name="subscribe-plan"]:checked');
        const selectedDelivery = document.querySelector('input[name="delivery"]:checked');

        if (selectedPlan) {
            if (selectedPlan.value === '1year') {
                total += 300;
                postageText.textContent = '（加付郵資NT$ 100）';
            } else if (selectedPlan.value === '2years') {
                total += 600;
                postageText.textContent = '（加付郵資NT$ 200）';
            }
        }

        if (selectedDelivery && selectedDelivery.value === 'registered') {
            if (selectedPlan && selectedPlan.value === '1year') {
                total += 100;
            } else if (selectedPlan && selectedPlan.value === '2years') {
                total += 200;
            }
        }

        totalPrice.textContent = `NT$ ${total}`;
        remittanceAmount.value = `NT$ ${total}`;
        orderAmount.value = `NT$ ${total}`;
    }

    function togglePaymentSections() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        if (selectedPayment === 'bank') {
            bankTransferSection.style.display = 'block';
            creditCardSection.style.display = 'none';
        } else {
            bankTransferSection.style.display = 'none';
            creditCardSection.style.display = 'block';
        }
    }

    planRadios.forEach(radio => radio.addEventListener('change', calculateTotal));
    deliveryRadios.forEach(radio => radio.addEventListener('change', calculateTotal));
    paymentRadios.forEach(radio => radio.addEventListener('change', togglePaymentSections));

    calculateTotal();
    togglePaymentSections();

    const cardNumberInput = document.getElementById('card-number');
    const cardLogo = document.getElementById('card-logo');

    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value;

        // 1. Remove non-numeric characters
        let numericValue = value.replace(/\D/g, '');

        // 2. Limit length to 16 digits
        numericValue = numericValue.slice(0, 16);

        // 3. Identify card type
        const cardType = getCardType(numericValue);

        // 4. Update logo
        cardLogo.className = 'card-logo'; // Reset classes
        if (cardType) {
            cardLogo.classList.add(cardType);
        }

        // 5. Add hyphens for formatting
        let formattedValue = '';
        for (let i = 0; i < numericValue.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += '-';
            }
            formattedValue += numericValue[i];
        }

        // 6. Update the input value
        e.target.value = formattedValue;
    });

    function getCardType(number) {
        // Visa: Starts with 4
        if (/^4/.test(number)) {
            return 'visa';
        }
        // Mastercard: Starts with 51-55
        if (/^5[1-5]/.test(number)) {
            return 'mastercard';
        }
        // JCB: Starts with 3528-3589
        if (/^35(2[89]|[3-8][0-9])/.test(number)) {
            return 'jcb';
        }
        return null; // Unknown
    }
});