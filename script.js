// script.js - الوظائف المشتركة

// التعامل مع نموذج الطلب في الصفحة الرئيسية
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orderForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const groom = document.getElementById('groomName').value.trim();
            const bride = document.getElementById('brideName').value.trim();
            const date = document.getElementById('weddingDate').value;
            const package = document.getElementById('package').value;
            const phone = document.getElementById('phone').value.trim();
            
            if (!groom || !bride || !date || !phone) {
                showMessage('من فضلك املأ جميع الحقول', 'error');
                return;
            }
            
            // حفظ الطلب في localStorage
            const orders = JSON.parse(localStorage.getItem('weddingOrders')) || [];
            orders.push({
                groom: groom,
                bride: bride,
                date: date,
                package: package,
                phone: phone,
                status: 'قيد التنفيذ',
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('weddingOrders', JSON.stringify(orders));
            
            showMessage('✅ تم استلام طلبك بنجاح! سنتواصل معك خلال ساعة.', 'success');
            form.reset();
            
            // إرسال إشعار واتساب (اختياري)
            const message = `طلب جديد: ${groom} + ${bride} - ${package} - ${date}`;
            console.log('إرسال إلى واتساب:', message);
        });
    }
});

// دالة عرض الرسائل
function showMessage(text, type) {
    const msgDiv = document.getElementById('formMessage');
    if (!msgDiv) return;
    
    msgDiv.innerHTML = `<div class="alert alert-${type}">${text}</div>`;
    setTimeout(() => {
        msgDiv.innerHTML = '';
    }, 5000);
}

// دالة لتنسيق التاريخ
function formatDate(dateString) {
    if (!dateString) return 'غير محدد';
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}