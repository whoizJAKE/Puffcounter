<script>
    // Get puffCounts from local storage or creer sum from the new user input profiles.
    let counts = JSON.parse(localStorage.getItem('puffCounts'));
    if (!counts) {
      counts = {};
      localStorage.setItem('puffCounts', JSON.stringify(counts));
    } else {
      // Enlever bc/MAMAdou des profiles on the landing page.
      if (counts.hasOwnProperty("MAMADOU")) {
        delete counts["MAMADOU"];
      }
      if (counts.hasOwnProperty("BC")) {
        delete counts["BC"];
      }
      localStorage.setItem('puffCounts', JSON.stringify(counts));
    }

    let usersSelect = document.getElementById('users');
    // Re-rentrer les users from LocalStorage (si y'en a lol)
    for (let u in counts) {
      let option = new Option(u, u);
      usersSelect.appendChild(option);
    }
    let newOption = new Option('Add User', 'new');
    usersSelect.appendChild(newOption);

    // get les local users si valid et create new output value
    let user = localStorage.getItem('currentUser');
    if (user && counts[user] !== undefined) {
      usersSelect.value = user;
    } else if (Object.keys(counts).length > 0) {
      user = Object.keys(counts)[0];
      usersSelect.value = user;
    } else {
      user = null;
      usersSelect.value = 'new';
    }
    document.getElementById('puffCount').textContent = user ? counts[user] : 0;

    // si le dropdown est setup to "Add User", display the new user input dans box next loading time .
    if (usersSelect.value === 'new') {
      document.getElementById('newUserBox').style.display = 'block';
    }

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

        // add new option dans le insert box qd set "Add User"
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

        // add le new user et le setup comme current user
        usersSelect.value = name;
        user = name;
        localStorage.setItem('currentUser', user);
        document.getElementById('puffCount').textContent = 0;
        newUserName.value = '';
        document.getElementById('newUserBox').style.display = 'none';
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
      // Si aucun user selectionner, ask le user dans creer un
      if (!user) {
        alert('Please add a user first.');
        return;
      }
      counts[user] = (counts[user] || 0) + 1;
      document.getElementById('puffCount').textContent = counts[user];
      localStorage.setItem('puffCounts', JSON.stringify(counts));

      const btn = document.getElementById('puffButton');
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 7.5;
      const centerY = rect.top + rect.height / 2 - 7.5;

      // smoke du css const ici
      for (let i = 0; i < 3; i++) {
        const offsetX = centerX + (Math.random() - 0.5) * 20;
        const offsetY = centerY + (Math.random() - 0.5) * 20;
        createSmoke(offsetX, offsetY);
      }
    }

    function reset() {
      if (confirm('Reset puff count?')) {
        if (!user) return;
        counts[user] = 0;
        document.getElementById('puffCount').textContent = 0;
        localStorage.setItem('puffCounts', JSON.stringify(counts));
      }
    }
  </script>
