// Main JavaScript for Ice Butcher Dashboard
document.addEventListener('DOMContentLoaded', function() {
  // Initialize tooltips and popovers
  initializeBootstrapComponents();

  // Initialize charts if they exist on the page
  initializeCharts();

  // Initialize dropdown functionality
  initializeDropdowns();

  // Initialize search functionality
  initializeSearch();

  // Initialize calendar if it exists
  initializeCalendar();

  // Initialize task status functionality
  initializeTaskStatus();

  // Initialize profile settings
  initializeProfileSettings();
});

/**
 * Initialize Bootstrap components like tooltips and popovers
 */
function initializeBootstrapComponents() {
  // Initialize tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  // Initialize popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
}

/**
 * Initialize sidebar toggle functionality
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show');
    document.body.classList.toggle('collapsed');
    sidebar.classList.toggle('collapsed');
}
function sidebarCollapse() {
    const sidebar = document.querySelector('.sidebar');
    document.body.classList.toggle('collapsed');
    sidebar.classList.toggle('collapsed');
}

/**
 * Initialize all dropdown menus
 */
function initializeDropdowns() {
  // For all dropdown toggles (custom implementation for non-Bootstrap dropdowns)
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      const dropdownMenu = this.nextElementSibling;
      if (dropdownMenu && dropdownMenu.classList.contains('dropdown-menu')) {
        dropdownMenu.classList.toggle('show');
        event.stopPropagation();
      }
    });
  });

  // Close all custom dropdowns when clicking outside
  document.addEventListener('click', function() {
    const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
    openDropdowns.forEach(dropdown => {
      if (!dropdown.classList.contains('persistent')) {
        dropdown.classList.remove('show');
      }
    });
  });

  // Action buttons in tables
  const actionButtons = document.querySelectorAll('.action-button');
  actionButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      const actionMenu = this.nextElementSibling;
      if (actionMenu) {
        actionMenu.classList.toggle('show');
        event.stopPropagation();
      }
    });
  });
}

/**
 * Initialize search functionality
 */
function initializeSearch() {
  const searchInputs = document.querySelectorAll('.search-box input');

  searchInputs.forEach(input => {
    input.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      let searchTarget;

      // Determine which elements to search based on the current page
      if (document.querySelector('.task-list')) {
        // Task search
        searchTarget = document.querySelectorAll('.task-item');
        searchTarget.forEach(item => {
          const taskTitle = item.querySelector('.task-title').textContent.toLowerCase();
          const taskDescription = item.querySelector('.task-description')?.textContent.toLowerCase() || '';

          if (taskTitle.includes(searchTerm) || taskDescription.includes(searchTerm)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      } else if (document.querySelector('.chat-list')) {
        // Chat search
        searchTarget = document.querySelectorAll('.chat-item');
        searchTarget.forEach(item => {
          const chatName = item.querySelector('.chat-name').textContent.toLowerCase();
          const chatMessage = item.querySelector('.chat-message').textContent.toLowerCase();

          if (chatName.includes(searchTerm) || chatMessage.includes(searchTerm)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      } else if (document.querySelector('.activity-table')) {
        // Activity search
        searchTarget = document.querySelectorAll('.activity-table tbody tr');
        searchTarget.forEach(item => {
          const name = item.querySelector('td:nth-child(2)').textContent.toLowerCase();
          const activity = item.querySelector('td:nth-child(3)').textContent.toLowerCase();

          if (name.includes(searchTerm) || activity.includes(searchTerm)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      }
    });
  });
}

/**
 * Initialize chart.js charts if they exist
 */
function initializeCharts() {
  // Work Time chart
  const workTimeChart = document.getElementById('workTimeChart');
  if (workTimeChart) {
    new Chart(workTimeChart, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Work Hours',
          data: [10, 8, 12, 9, 7],
          backgroundColor: [
            '#153965',
            '#2a5e99',
            '#153965',
            '#2a5e99',
            '#7eb6dd'
          ],
          borderRadius: 4,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
            ticks: {
              stepSize: 5
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Upcoming Orders chart
  const ordersChart = document.getElementById('ordersChart');
  if (ordersChart) {
    new Chart(ordersChart, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Fri', 'Thu'],
        datasets: [{
          label: 'Orders',
          data: [50, 40, 30, 20, 10],
          backgroundColor: [
            '#153965',
            '#2a5e99',
            '#153965',
            '#2a5e99',
            '#7eb6dd'
          ],
          borderRadius: 4,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: {
            beginAtZero: true,
            max: 60,
            ticks: {
              stepSize: 10
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  // Task Progress charts
  const progressCharts = document.querySelectorAll('.task-progress-chart');
  progressCharts.forEach(chartCanvas => {
    const percentValue = chartCanvas.getAttribute('data-progress');
    const percent = percentValue ? parseInt(percentValue) : 0;

    new Chart(chartCanvas, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [percent, 100 - percent],
          backgroundColor: [
            '#4e73df',
            '#eaecf4'
          ],
          cutout: '80%',
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        }
      }
    });
  });
}

/**
 * Initialize calendar functionality
 */
function initializeCalendar() {
  const calendarDays = document.querySelectorAll('.calendar-day');
  const monthNames = document.querySelectorAll('.month-name');
  const yearDisplay = document.querySelector('.year-display');
  const prevMonthBtn = document.querySelector('.prev-month');
  const nextMonthBtn = document.querySelector('.next-month');

  if (calendarDays.length && prevMonthBtn && nextMonthBtn) {
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    // Function to update calendar
    const updateCalendar = () => {
      // Update month and year displays
      if (monthNames.length) {
        monthNames.forEach(monthName => {
          monthName.classList.remove('active');
        });
        monthNames[currentMonth].classList.add('active');
      }

      if (yearDisplay) {
        yearDisplay.textContent = currentYear;
      }

      // Get first day of month and number of days
      const firstDay = new Date(currentYear, currentMonth, 1).getDay();
      const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

      // Update calendar days
      calendarDays.forEach((day, index) => {
        day.textContent = '';
        day.classList.remove('current-month', 'other-month', 'current-day', 'has-event');

        const dayNumber = index - firstDay + 1;

        if (dayNumber > 0 && dayNumber <= daysInMonth) {
          day.textContent = dayNumber;
          day.classList.add('current-month');

          // Mark current day
          if (currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear() &&
              dayNumber === currentDate.getDate()) {
            day.classList.add('current-day');
          }

          // Add click event to days
          day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');

            // Here you would show events for the selected day
            const selectedDate = new Date(currentYear, currentMonth, parseInt(this.textContent));
            showEventsForDate(selectedDate);
          });
        } else {
          day.classList.add('other-month');
        }
      });
    };

    // Initialize calendar
    updateCalendar();

    // Previous month button
    prevMonthBtn.addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      updateCalendar();
    });

    // Next month button
    nextMonthBtn.addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      updateCalendar();
    });
  }

  // Handle day/week/month view toggling
  const viewButtons = document.querySelectorAll('.view-button');
  const calendarViews = document.querySelectorAll('.calendar-view');

  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const viewType = this.getAttribute('data-view');

      // Remove active class from all buttons and add to clicked
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Hide all views and show the selected one
      calendarViews.forEach(view => {
        view.style.display = 'none';
        if (view.classList.contains(`${viewType}-view`)) {
          view.style.display = 'block';
        }
      });
    });
  });
}

/**
 * Show events for a specific date (calendar functionality)
 */
function showEventsForDate(date) {
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
  const eventsContainer = document.querySelector('.day-events');

  if (eventsContainer) {
    eventsContainer.innerHTML = `<h5 class="events-date">${formattedDate}</h5>`;

    // Sample events data - In a real app, this would come from an API or database
    const events = [
      { time: '08:00 AM', title: 'Team Meeting', location: 'Conference Room' },
      { time: '10:30 AM', title: 'Client Call', location: 'Zoom' },
      { time: '02:00 PM', title: 'Project Review', location: 'Design Studio' }
    ];

    if (events.length) {
      const eventsList = document.createElement('div');
      eventsList.className = 'events-list';

      events.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
          <div class="event-time">${event.time}</div>
          <div class="event-info">
            <div class="event-title">${event.title}</div>
            <div class="event-location"><i class="bi bi-geo-alt"></i> ${event.location}</div>
          </div>
        `;
        eventsList.appendChild(eventItem);
      });

      eventsContainer.appendChild(eventsList);
    } else {
      eventsContainer.innerHTML += '<p class="no-events">No events scheduled for this day</p>';
    }
  }
}

/**
 * Initialize task status functionality (kanban-like)
 */
function initializeTaskStatus() {
  // Task status counts
  const todoCount = document.querySelector('.task-column.todo .task-number');
  const doingCount = document.querySelector('.task-column.doing .task-number');
  const doneCount = document.querySelector('.task-column.done .task-number');

  // If counts exist, you can set them dynamically
  // In a real app, these would come from an API or database
  if (todoCount && doingCount && doneCount) {
    todoCount.textContent = '6';
    doingCount.textContent = '3';
    doneCount.textContent = '20';
  }

  // Card view and list view toggle
  const cardViewBtn = document.getElementById('cardViewBtn');
  const listViewBtn = document.getElementById('listViewBtn');
  const cardView = document.querySelector('.card-view');
  const listView = document.querySelector('.list-view');

  if (cardViewBtn && listViewBtn && cardView && listView) {
    cardViewBtn.addEventListener('click', function() {
      cardViewBtn.classList.add('active');
      listViewBtn.classList.remove('active');
      cardView.style.display = 'flex';
      listView.style.display = 'none';
    });

    listViewBtn.addEventListener('click', function() {
      listViewBtn.classList.add('active');
      cardViewBtn.classList.remove('active');
      listView.style.display = 'block';
      cardView.style.display = 'none';
    });
  }

  // Task filter functionality
  const filterButtons = document.querySelectorAll('.task-filter');
  const taskItems = document.querySelectorAll('.task-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filterValue = this.getAttribute('data-filter');

      // Toggle active class on buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      // Filter task items
      taskItems.forEach(item => {
        if (filterValue === 'all') {
          item.style.display = '';
        } else {
          const taskStatus = item.getAttribute('data-status');
          item.style.display = taskStatus === filterValue ? '' : 'none';
        }
      });
    });
  });
}

/**
 * Initialize profile settings form
 */
function initializeProfileSettings() {
  const profileForm = document.getElementById('profileForm');
  const passwordForm = document.getElementById('passwordForm');
  const notificationForm = document.getElementById('notificationForm');

  if (profileForm) {
    profileForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const profileData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        bio: formData.get('bio')
      };

      // In a real app, you would send this to an API
      console.log('Profile update data:', profileData);

      // Show success message
      showAlert('Profile updated successfully!', 'success');
    });
  }

  if (passwordForm) {
    passwordForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const currentPassword = formData.get('current-password');
      const newPassword = formData.get('new-password');
      const confirmPassword = formData.get('confirm-password');

      // Basic validation
      if (newPassword !== confirmPassword) {
        showAlert('New passwords do not match!', 'danger');
        return;
      }

      // In a real app, you would send this to an API
      console.log('Password update initiated');

      // Show success message
      showAlert('Password updated successfully!', 'success');
      this.reset();
    });
  }

  if (notificationForm) {
    notificationForm.addEventListener('submit', function(event) {
      event.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const notificationSettings = {
        emailNotifications: formData.get('email-notifications') === 'on',
        pushNotifications: formData.get('push-notifications') === 'on',
        smsNotifications: formData.get('sms-notifications') === 'on',
        desktopNotifications: formData.get('desktop-notifications') === 'on'
      };

      // In a real app, you would send this to an API
      console.log('Notification settings:', notificationSettings);

      // Show success message
      showAlert('Notification settings saved!', 'success');
    });
  }

  // Profile image upload preview
  const profileImageInput = document.getElementById('profile-image');
  const profileImagePreview = document.getElementById('profile-image-preview');

  if (profileImageInput && profileImagePreview) {
    profileImageInput.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          profileImagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

/**
 * Show an alert message
 */
function showAlert(message, type = 'info') {
  const alertContainer = document.querySelector('.alert-container');

  if (!alertContainer) {
    return;
  }

  const alert = document.createElement('div');
  alert.className = `alert alert-${type} alert-dismissible fade show`;
  alert.role = 'alert';
  alert.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  `;

  alertContainer.appendChild(alert);

  // Auto dismiss after 5 seconds
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => {
      alert.remove();
    }, 150);
  }, 5000);
}

/**
 * Chat functionality
 */
function initializeChat() {
  const chatList = document.querySelectorAll('.chat-item');
  const chatContainer = document.querySelector('.chat-container');
  const messageInput = document.querySelector('.chat-input');
  const sendButton = document.querySelector('.send-button');
  const fileAttachmentButton = document.querySelector('.attachment-button');
  const fileInput = document.getElementById('chat-file-input');

  if (chatList.length && chatContainer && messageInput && sendButton) {
    // Select chat when clicking on a chat item
    chatList.forEach(chat => {
      chat.addEventListener('click', function() {
        chatList.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        // In a real app, you would load the chat history for this conversation
        const chatName = this.querySelector('.chat-name').textContent;
        document.querySelector('.chat-header-name').textContent = chatName;
      });
    });

    // Send message when clicking send button or pressing Enter
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    });

    // Handle file attachment
    if (fileAttachmentButton && fileInput) {
      fileAttachmentButton.addEventListener('click', function() {
        fileInput.click();
      });

      fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
          const file = this.files[0];
          // Create a message with the file attachment
          const chatBody = document.querySelector('.chat-body');
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

          const fileIcon = getFileIcon(file.type);
          const fileSize = formatFileSize(file.size);

          const messageElement = document.createElement('div');
          messageElement.className = 'message outgoing';
          messageElement.innerHTML = `
            <div class="message-content">
              <div class="file-attachment">
                <i class="${fileIcon}"></i>
                <div class="file-info">
                  <div class="file-name">${file.name}</div>
                  <div class="file-size">${fileSize}</div>
                </div>
              </div>
              <div class="message-time">${timestamp}</div>
            </div>
          `;

          chatBody.appendChild(messageElement);

          // Reset file input
          this.value = '';

          // Scroll to bottom of chat
          chatBody.scrollTop = chatBody.scrollHeight;
        }
      });
    }

    function sendMessage() {
      const message = messageInput.value.trim();
      if (message) {
        const chatBody = document.querySelector('.chat-body');
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageElement = document.createElement('div');
        messageElement.className = 'message outgoing';
        messageElement.innerHTML = `
          <div class="message-content">
            ${message}
            <div class="message-time">${timestamp}</div>
          </div>
        `;

        chatBody.appendChild(messageElement);
        messageInput.value = '';

        // Scroll to bottom of chat
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    }

    // Helper function to get file icon based on file type
    function getFileIcon(fileType) {
      if (fileType.includes('image')) {
        return 'bi bi-image';
      } else if (fileType.includes('pdf')) {
        return 'bi bi-file-pdf';
      } else if (fileType.includes('word') || fileType.includes('document')) {
        return 'bi bi-file-word';
      } else if (fileType.includes('excel') || fileType.includes('spreadsheet')) {
        return 'bi bi-file-excel';
      } else if (fileType.includes('zip') || fileType.includes('compressed')) {
        return 'bi bi-file-zip';
      } else {
        return 'bi bi-file-earmark';
      }
    }

    // Helper function to format file size
    function formatFileSize(bytes) {
      if (bytes < 1024) {
        return bytes + ' bytes';
      } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
      } else {
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      }
    }

    const emojiButton = document.querySelector('.emoji-button');
    emojiButton.addEventListener('click', function() {
      showAlert('Tip: Press ⊞ Win + . (or Cmd + Ctrl + Space on Mac) to open emoji picker.', 'info');
    });
  }
}
