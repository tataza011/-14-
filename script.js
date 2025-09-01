document.addEventListener('DOMContentLoaded', () => {
    const page0 = document.getElementById('page0');
    const pageIncorrect = document.getElementById('page-incorrect');
    const pageCorrect = document.getElementById('page-correct');
    const page1 = document.getElementById('page1');
    const pageIncorrectPassword = document.getElementById('page-incorrect-password');
    const page2 = document.getElementById('page2');
    
    const keypadButtons = document.querySelectorAll('#page1 .keypad button');
    const backToStartButton = document.querySelector('#page2 .back-to-start-btn');
    const tryAgainButton = document.querySelector('#page-incorrect-password .incorrect-password-btn');
    const resultText = document.getElementById('result');
    const passwordDisplay = document.getElementById('password-display');
    
    const allButtons = document.querySelectorAll('button');

    const correctPassword = '020724';
    let enteredPassword = '';

    // --- ส่วนเพิ่มเสียงเข้ามาใหม่ ---
    // สร้าง audio object สำหรับเสียงต่างๆ
    const backgroundMusicMain = new Audio('0830.MP3'); // เพลงสำหรับหน้าแรกและหน้าใส่รหัส
    const backgroundMusicCountdown = new Audio('Pretty eyes - zehdi.mp3'); // เพลงสำหรับหน้านับเวลาโดยเฉพาะ
    const clickSound = new Audio('pop.mp3');
    
    backgroundMusicMain.loop = true;
    backgroundMusicMain.volume = 0.5;
    backgroundMusicCountdown.loop = true;
    backgroundMusicCountdown.volume = 0.5;

    // เริ่มเล่นเพลงหน้าแรกเมื่อผู้ใช้มีการกระทำบนหน้าเว็บครั้งแรก
    document.body.addEventListener('click', () => {
        backgroundMusicMain.play().catch(e => console.error("Failed to play main music:", e));
    }, { once: true });

    // เพิ่ม Event Listener สำหรับปุ่มทั้งหมดเพื่อเล่นเสียงคลิก
    allButtons.forEach(button => {
        button.addEventListener('click', () => {
            clickSound.play();
        });
    });

    // --- จบส่วนเพิ่มเสียงเข้ามาใหม่ ---

    // Function to handle message change for incorrect answers
    window.changeMessage = (message) => {
        if (message === 'วันอังคาร') {
            resultText.textContent = '';
            page0.classList.remove('active');
            pageIncorrect.classList.add('active');
        } else if (message === 'วันที่รักต้าที่สุด') {
            resultText.textContent = '';
            setTimeout(() => {
                page0.classList.remove('active');
                pageCorrect.classList.add('active');
            }, 500);
        } else {
            resultText.textContent = 'ยังไม่ถูกน้า ลองคิดดูอีกทีสิ! 🤔';
        }
    };

    // Function to go from any page to password page
    window.goToPasswordPage = () => {
        // *** โค้ดส่วนนี้จะไม่มีการสั่งให้หยุดเพลงหลักแล้ว ***
        page0.classList.remove('active');
        pageCorrect.classList.remove('active');
        page1.classList.add('active');
        passwordDisplay.textContent = '';
        enteredPassword = '';
    };

    // Function to go back from the incorrect page (for "วันอังคาร" answer)
    window.goBackToQuestion = () => {
        pageIncorrect.classList.remove('active');
        page0.classList.add('active');
        resultText.textContent = '';
    };

    // Function to go back from the incorrect password page
    window.goBackToPasswordPage = () => {
        pageIncorrectPassword.classList.remove('active');
        page1.classList.add('active');
        passwordDisplay.textContent = '';
        enteredPassword = '';
    };

    // Handle password input
    keypadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();
            
            // ถ้ากดปุ่มลบ
            if (value === '←') {
                enteredPassword = enteredPassword.slice(0, -1);
                passwordDisplay.textContent = enteredPassword;
            } 
            // ถ้ากดตัวเลข
            else if (enteredPassword.length < 6) {
                enteredPassword += value;
                passwordDisplay.textContent = enteredPassword;
            }

            // ตรวจสอบรหัสเมื่อครบ 6 ตัว
            if (enteredPassword.length === 6) {
                setTimeout(() => {
                    if (enteredPassword === correctPassword) {
                        page1.classList.remove('active');
                        page2.classList.add('active');
                        startCountdown();
                        
                        // หยุดเพลงหลักแล้วเล่นเพลงหน้านับเวลา
                        backgroundMusicMain.pause();
                        backgroundMusicMain.currentTime = 0;
                        backgroundMusicCountdown.play().catch(e => console.error("Failed to play countdown music:", e));
                    } else {
                        page1.classList.remove('active');
                        pageIncorrectPassword.classList.add('active');
                    }
                }, 500);
            }
        });
    });

    // Handle back to start button on page 2
    backToStartButton.addEventListener('click', () => {
        // หยุดเพลงหน้านับเวลา
        backgroundMusicCountdown.pause();
        backgroundMusicCountdown.currentTime = 0;
        
        // กลับมาเล่นเพลงหน้าหลัก
        backgroundMusicMain.play().catch(e => console.error("Failed to play main music:", e));

        page2.classList.remove('active');
        page0.classList.add('active');
        enteredPassword = '';
        resultText.textContent = '';
    });

    // Countdown function
    function startCountdown() {
        const startDate = new Date('2024-07-02T16:13:00');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        setInterval(() => {
            const now = new Date();
            const timeDifference = now - startDate;
            if (timeDifference < 0) {
                daysEl.textContent = '0';
                hoursEl.textContent = '0';
                minutesEl.textContent = '0';
                secondsEl.textContent = '0';
                return;
            }
            const totalSeconds = Math.floor(timeDifference / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);
            daysEl.textContent = totalDays;
            hoursEl.textContent = totalHours % 24;
            minutesEl.textContent = totalMinutes % 60;
            secondsEl.textContent = totalSeconds % 60;
        }, 1000);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // ... (ส่วนประกาศตัวแปรเดิม) ...
    const page3 = document.getElementById('page3');
    const nextToVideoButton = document.querySelector('.next-to-video-btn');
    const finalVideo = document.getElementById('finalVideo');

    // ... (ส่วน Audio Object เดิม) ...
    const backgroundMusicVideo = new Audio('bg_music_video.mp3'); // ถ้าต้องการเพลงใหม่สำหรับหน้าวิดีโอ
    backgroundMusicVideo.loop = true;
    backgroundMusicVideo.volume = 0.5;

    // ... (ส่วน Event Listeners สำหรับปุ่มเดิม) ...

    // เพิ่ม Event Listener สำหรับปุ่ม "ไปต่อ" ในหน้า 2
    nextToVideoButton.addEventListener('click', () => {
        // หยุดเพลงหน้านับเวลา
        backgroundMusicCountdown.pause();
        backgroundMusicCountdown.currentTime = 0;

        page2.classList.remove('active');
        page3.classList.add('active');
        
        // เริ่มเล่นวิดีโอโดยอัตโนมัติ
        finalVideo.play().catch(e => console.error("Video playback failed:", e));

        // ถ้าต้องการเพลงใหม่สำหรับหน้าวิดีโอ
        // backgroundMusicVideo.play().catch(e => console.error("Video music failed:", e));
    });

    // แก้ไข Event Listener สำหรับปุ่ม "เริ่มใหม่" บนหน้า 3
    document.querySelector('#page3 .back-to-start-btn').addEventListener('click', () => {
        // หยุดวิดีโอ
        finalVideo.pause();
        finalVideo.currentTime = 0;

        // ถ้ามีเพลงหน้าวิดีโอ ให้หยุดเพลงด้วย
        // backgroundMusicVideo.pause();
        // backgroundMusicVideo.currentTime = 0;

        // กลับไปหน้าแรก
        page3.classList.remove('active');
        page0.classList.add('active');
        
        // กลับมาเล่นเพลงหน้าหลัก
        backgroundMusicMain.play().catch(e => console.error("Failed to play main music:", e));
    });

    // ... (ส่วนโค้ดอื่นๆ ที่เหลือ) ...
});
// --- 5. การจัดการปุ่ม "ไปต่อ" และ "เริ่มใหม่" ในหน้าสุดท้าย ---
    // --------------------------------------------------------------------------
    // จัดการปุ่ม "ไปต่อ" ในหน้า 2
    nextToVideoButton.addEventListener('click', () => {
        backgroundMusicCountdown.pause();
        backgroundMusicCountdown.currentTime = 0;

        page2.classList.remove('active');
        page3.classList.add('active');
        
        finalVideo.play().catch(e => console.error("Video playback failed:", e));
    });

    // จัดการปุ่ม "เริ่มใหม่" ในหน้า 2 (ย้อนกลับไปหน้าแรก)
    backToStartButton.addEventListener('click', () => {
        backgroundMusicCountdown.pause();
        backgroundMusicCountdown.currentTime = 0;
        
        backgroundMusicMain.play().catch(e => console.error("Failed to play main music:", e));

        page2.classList.remove('active');
        page0.classList.add('active');
        enteredPassword = '';
        resultText.textContent = '';
    });

    // จัดการปุ่ม "ย้อนกลับไปหน้าแรก" ในหน้า 3
    document.querySelector('#page3 .back-to-start-btn').addEventListener('click', () => {
        finalVideo.pause();
        finalVideo.currentTime = 0;

        page3.classList.remove('active');
        page0.classList.add('active');
        
        backgroundMusicMain.play().catch(e => console.error("Failed to play main music:", e));
    });

    // --------------------------------------------------------------------------
    // --- 6. ฟังก์ชันนับถอยหลัง ---
    // --------------------------------------------------------------------------
    function startCountdown() {
        const startDate = new Date('2024-07-02T16:13:00');
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        setInterval(() => {
            const now = new Date();
            const timeDifference = now - startDate;
            if (timeDifference < 0) {
                daysEl.textContent = '0';
                hoursEl.textContent = '0';
                minutesEl.textContent = '0';
                secondsEl.textContent = '0';
                return;
            }
            const totalSeconds = Math.floor(timeDifference / 1000);
            const totalMinutes = Math.floor(totalSeconds / 60);
            const totalHours = Math.floor(totalMinutes / 60);
            const totalDays = Math.floor(totalHours / 24);
            daysEl.textContent = totalDays;
            hoursEl.textContent = totalHours % 24;
            minutesEl.textContent = totalMinutes % 60;
            secondsEl.textContent = totalSeconds % 60;
        }, 1000);
    }
