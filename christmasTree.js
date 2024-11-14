        const apiUrl = 'http://localhost:3000/api/ornaments'; // Укажите URL API
        let currentTreeName = 'my_tree';

        async function loadOrnaments() {
            const response = await fetch(`${apiUrl}?treeName=${currentTreeName}`);
            const ornaments = await response.json();

            const treeContainer = document.getElementById('treeWrapper');
            treeContainer.innerHTML = '<img src="https://i.imgur.com/uacp7T1.png" alt="Christmas Tree" style="width: 100%;">';

            ornaments.forEach(ornament => addOrnament(ornament.url, ornament.message, ornament.left, ornament.top, false));
        }

        async function addOrnament(url = null, message = '', left = null, top = null, isNew = true) {
            if (isNew) {
                url = document.getElementById('ornamentUrl').value;
                message = document.getElementById('ornamentMessage').value;
            }

            if (!url) {
                alert('Please enter an image URL!');
                return;
            }

            const treeContainer = document.getElementById('treeWrapper');
            const treeWidth = treeContainer.offsetWidth;
            const treeHeight = treeContainer.offsetHeight;

            if (left === null || top === null) {
                left = Math.random() * (treeWidth - 40) + 20;
                top = Math.random() * (treeHeight - 40) + 20;
            }

            const ornament = document.createElement('div');
            ornament.style.position = 'absolute';
            ornament.style.left = `${left}px`;
            ornament.style.top = `${top}px`;
            ornament.style.width = '40px';
            ornament.style.height = '40px';
            ornament.style.border = '3px solid blue';
            ornament.style.borderRadius = '50%';

            const img = document.createElement('img');
            img.src = url;
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            ornament.appendChild(img);

            treeContainer.appendChild(ornament);

            if (isNew) {
                await saveOrnamentToServer(url, message, left, top);
            }
        }

        async function saveOrnamentToServer(url, message, left, top) {
            await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ treeName: currentTreeName, url, message, left, top })
            });
        }

        document.addEventListener('DOMContentLoaded', loadOrnaments);
