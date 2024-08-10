document.addEventListener('DOMContentLoaded', function() {
    // Menu de hambúrguer para dispositivos móveis
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burger.classList.toggle('toggle');
    });

    // Formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você adicionaria a lógica de autenticação
            console.log('Login submitted');
        });
    }

    // Formulário de cadastro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você adicionaria a lógica de registro
            console.log('Registration submitted');
        });
    }

    // Função para adicionar item ao carrinho (exemplo)
    window.addToCart = function(itemId) {
        // Aqui você adicionaria a lógica para adicionar ao carrinho
        console.log(`Item ${itemId} added to cart`);
    }

    // Função para aplicar cupom de desconto (exemplo)
    window.applyCoupon = function() {
        const couponCode = document.getElementById('coupon-code').value;
        // Aqui você adicionaria a lógica para validar e aplicar o cupom
        console.log(`Coupon ${couponCode} applied`);
    }
});

// Funções adicionais seriam adicionadas aqui para outras funcionalidades
// como sistema de pontos, rastreamento de pedidos, etc.
