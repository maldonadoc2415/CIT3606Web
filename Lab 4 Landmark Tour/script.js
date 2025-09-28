const radios = document.querySelectorAll('input[name="location"]');
const contents = document.querySelectorAll('.content');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        contents.forEach(div => div.classList.remove('visible'));
        const selected = document.getElementById(radio.value);
        if (selected) {
          selected.classList.add('visible');
        }
      });
    });

const sizeSelect = document.getElementById('size');
function updateSize() {
    const size = sizeSelect.value;
    contents.forEach(div => {
        const img = div.querySelector('img');
        const iframe = div.querySelector('iframe');
        if (img) img.style.width = size + 'px';
        if (iframe) iframe.style.width = size + 'px';
    });
}