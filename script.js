
 /*dark_mode_btn */
    const dark_mode_btn=document.getElementById("dark_mode");
    dark_mode_btn.addEventListener("click", ()=>{
        document.body.classList.toggle('dark');
    });
    /*menu_btn*/
    const menu_icon=document.getElementById("menu_icon");
    const navlinks=document.getElementById("links_menu");
    menu_icon.addEventListener("click", ()=>{
        navlinks.classList.toggle('active')
    })
    /**compteur experience */
const counters = document.getElementsByClassName("counter");

Array.from(counters).forEach(counter => {
    counter.innerText = '+0';

    const update = () => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText.replace('+', '');
        const increment = Math.ceil(target / 300); 

        if (current < target) {
            const newValue = current + increment;
            counter.innerText = `+${newValue > target ? target : newValue}`;
            setTimeout(update, 10); 
        } else {
            counter.innerText = `+${target}`; 
        }
    };

    update();
});
/*compteur promotion*/
function getNextSunday() {
  const now = new Date();
  const day = now.getDay(); // 0 = ce dimanche
  const diff = (2 - day) % 7;

  const sunday = new Date(now);
  if (diff === 0 && now.getHours() < 23) {
    sunday.setDate(sunday.getDate());
  } else {
    sunday.setDate(sunday.getDate() + diff);
  }

  sunday.setHours(23, 59, 59, 999);
  return sunday.getTime();
}

const countdownDate = getNextSunday();

const interval = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById("days").innerText = "0";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconde").innerText = "00"; // 
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const secondes = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = String(hours).padStart(2, '0');
  document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
  document.getElementById("seconde").innerText = String(secondes).padStart(2, '0'); // ✅ attention au nom
}, 1000);




    