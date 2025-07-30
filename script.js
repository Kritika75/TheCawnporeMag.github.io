function openReportModal() {
  document.getElementById('reportModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeReportModal() {
  document.getElementById('reportModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

function submitReport() {
  const reportText = document.getElementById('reportText').value.trim();
  if (!reportText) {
    alert("Please describe the problem before submitting.");
    return;
  }
  alert("Thank you! Your report has been submitted.");
  document.getElementById('reportText').value = "";
  closeReportModal();
}

function outsideClick(event) {
  if (event.target.id === 'reportModal') {
    closeReportModal();
  }
}
