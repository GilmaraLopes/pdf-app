document.addEventListener('DOMContentLoaded', () => {
  const pdfFilesInput = document.getElementById('pdfFiles');
  const mergeButton = document.getElementById('mergeButton');
  const downloadLink = document.getElementById('downloadLink');

  mergeButton.addEventListener('click', async () => {
    const selectedFiles = pdfFilesInput.files;
    if (selectedFiles.length < 2) {
      alert('Selecione pelo menos 2 arquivos PDF.');
      return;
    }

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('pdfs', file);
    }

    try {
      const response = await fetch('/merge', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        downloadLink.href = blobUrl;
        downloadLink.style.display = 'inline-block';
      } else {
        console.error('Erro ao mesclar os PDFs.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
    }
  });
});
