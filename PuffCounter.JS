<script>
    // Grab the type from the URL (?type=cigarette or ?type=marijuana)
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    // Set the title and button text based on what they clicked
    if (type === 'cigarette') {
      document.querySelector('h1').textContent = 'Cigarette Puff Counter';
      document.getElementById('puffButton').textContent = 'Take a Puff';
    } else if (type === 'marijuana') {
      document.querySelector('h1').textContent = 'Marijuana Puff Counter';
      document.getElementById('puffButton').textContent = 'Take a Hit';
    } else {
      // Fallback if something’s fucked up in the URL
      document.querySelector('h1').textContent = 'Puff Counter';
      document.getElementById('puffButton').textContent = 'Take a Puff';
    }

    // Load puff counts from local storage
    let counts = JSON.parse(localStorage.getItem('puffCounts'));
    if (!counts) {
      counts = {};
      localStorage.setItem('puffCounts', JSON.stringify(counts));
    }
    /* Removed the MAMADOU/BC deletion part, seemed like your test shit */

    let usersSelect = document.getElementById('users');
    // Populate the dropdown with users
    for (let u in counts) {
      let option = new Option(u, u);
      usersSelect.appendChild(option);
    }
    let newOption = new Option('Add User', 'new');
    usersSelect.appendChild(newOption);

    // Get the current user
    let user = localStorage.getItem('currentUser');
    if (user && counts[user]) {
      usersSelect.value = user;
    } else if (Object.keys(counts).length > 0) {
      user = Object.keys(counts)[0];
      usersSelect.value = user;
    } else {
      user = null;
      usersSelect.value = 'new';
    }
    // Show the count for this user and type (0 if undefined)
    const currentCount = user && counts[user] && counts[user][type] !== undefined ? counts[user][type] : 0;
    document.getElementById('puffCount').textContent = currentCount;

    // Show the "Add User" box if selected
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
        const userCounts = counts[user] || {};
        const count = userCounts[type] || 0;
        document.getElementById('puffCount').textContent = count;
        localStorage.setItem('currentUser', user);
      }
    }

    function addUser() {
      let newUserName = document.getElementById('newUserName');
      let name = newUserName.value.trim();

      if (name) {
        if (!counts[name]) {
          counts[name] = {}; // New user gets an empty object
        }
        localStorage.setItem('puffCounts', JSON.stringify(counts));

        // Add to dropdown
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

        // Set as current user
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
      if (!user) {
        alert('Please add a user first.');
        return;
      }
      if (!counts[user]) {
        counts[user] = {};
      }
      counts[user][type] = (counts[user][type] || 0) + 1;
      document.getElementById('puffCount').textContent = counts[user][type];
      localStorage.setItem('puffCounts', JSON.stringify(counts));

      // Your dope smoke effect
      const btn = document.getElementById('puffButton');
      const rect = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2 - 7.5;
      const centerY = rect.top + rect.height / 2 - 7.5;
      for (let i = 0; i < 3; i++) {
        const offsetX = centerX + (Math.random() - 0.5) * 20;
        const offsetY = centerY + (Math.random() - 0.5) * 20;
        createSmoke(offsetX, offsetY);
      }
    }

    function reset() {
      if (confirm('Reset puff count?')) {
        if (!user) return;
        if (!counts[user]) {
          counts[user] = {};
        }
        counts[user][type] = 0;
        document.getElementById('puffCount').textContent = 0;
        localStorage.setItem('puffCounts', JSON.stringify(counts));
      }
    }
  </script>
