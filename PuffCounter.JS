<script>
        let counts = JSON.parse(localStorage.getItem('puffCounts'));
        if (!counts) {
            counts = { MAMADOU: 0, BC: 0 };
            localStorage.setItem('puffCounts', JSON.stringify(counts));
        }
//thankss OpenAi pour ce scrypt la couldnt do it without u
        let usersSelect = document.getElementById('users');
        for (let u in counts) {
            let option = new Option(u, u);
            usersSelect.appendChild(option);
        }
        let newOption = new Option('Add User', 'new');
        usersSelect.appendChild(newOption);

        // supposer garder le local data du user using it mais bon.. 
        let user = localStorage.getItem('currentUser');
        if (user && counts[user] !== undefined) {
            usersSelect.value = user;
        } else {
            user = Object.keys(counts)[0];
            usersSelect.value = user;
        }
        document.getElementById('puffCount').textContent = counts[user];

        function switchUser() {
            let dropdown = document.getElementById('users');
            let newUserBox = document.getElementById('newUserBox');
            
            if (dropdown.value === 'new') {
                newUserBox.style.display = 'block';
            } else {
                newUserBox.style.display = 'none';
                user = dropdown.value;
                document.getElementById('puffCount').textContent = counts[user] || 0;
                localStorage.setItem('currentUser', user);
            }
        }

        function addUser() {
            let newUserName = document.getElementById('newUserName');
            let name = newUserName.value.trim();
            
            if (name) {
                counts[name] = 0;
                localStorage.setItem('puffCounts', JSON.stringify(counts));

                // new option de select, this crap should fucking work finally
                let option = new Option(name, name);
                let lastOption = usersSelect.lastElementChild;
                if (lastOption.value === 'new') {
                    usersSelect.insertBefore(option, lastOption);
                } else {
                    for (let i = 0; i < usersSelect.children.length; i++) {
                        if (usersSelect.children[i].value === 'new') {
                            usersSelect.insertBefore(option, usersSelect.children[i]);
                            break;
                        }
                    }
                }

                // Selectioner le wwantrd user ??
                usersSelect.value = name;
                user = name;
                localStorage.setItem('currentUser', user);
                document.getElementById('puffCount').textContent = 0;
                newUserName.value = '';
                newUserBox.style.display = 'none';
            }
        }

        function createSmoke(x, y) {
            const smoke = document.createElement('div');
            smoke.className = 'smoke';
            smoke.style.left = `${x}px`;
            smoke.style.top = `${y}px`;
            document.body.appendChild(smoke);
            setTimeout(() => smoke.remove(), 2000);
        }

        function puff() {
            counts[user] = (counts[user] || 0) + 1;
            document.getElementById('puffCount').textContent = counts[user];
            localStorage.setItem('puffCounts', JSON.stringify(counts));

            const btn = document.getElementById('puffButton');
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2 - 7.5;
            const centerY = rect.top + rect.height / 2 - 7.5;

            // crée des particxules de smoke pull du css *only fucking thing i understood de ce JS bulshit la
            for (let i = 0; i < 3; i++) {
                const offsetX = centerX + (Math.random() - 0.5) * 20;
                const offsetY = centerY + (Math.random() - 0.5) * 20;
                createSmoke(offsetX, offsetY);
            }
        }

        function reset() {
            if (confirm('Reset puff count?')) {
                counts[user] = 0;
                document.getElementById('puffCount').textContent = 0;
                localStorage.setItem('puffCounts', JSON.stringify(counts));
            }
        }
    </script>
