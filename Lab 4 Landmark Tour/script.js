const radios = document.querySelectorAll('input[name="location"]');
const contents = document.querySelectorAll('.content');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        contents.forEach(div => div.classList.remove('visible'));
        const selected = document.getElementById(radio.value);
        if (selected) {
          selected.classList.add('visible');
        }
        const descriptionText = document.getElementById('descriptionText');
    const selectedRadio = document.querySelector('input[name="location"]:checked');
    if (selectedRadio) {}
        switch (selectedRadio.value) {
            case 'bali':
                descriptionText.textContent = "Bali is known for its stunning beaches, vibrant culture, and beautiful landscapes. It's a perfect destination for relaxation and adventure.";
                break;
            case 'paris':
                descriptionText.textContent = "Paris, the city of lights, is famous for its iconic landmarks like the Eiffel Tower, world-class art museums, and charming streets filled with cafes and boutiques.";
                break;
            case 'tokyo':
                descriptionText.textContent = "Tokyo is a bustling metropolis that seamlessly blends tradition and modernity. From historic temples to cutting-edge technology, Tokyo offers a unique experience for every traveler.";
                break;
            default:
                descriptionText.textContent = "These are some of my dream vacation spots. I would love to visit Bali for its beautiful beaches and vibrant culture, Paris for its iconic landmarks and art, and Tokyo for its unique blend of tradition and modernity.";
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

