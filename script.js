document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionBox = document.getElementById('suggestionBox');
    const medicineTable = document.getElementById('medicineTable').getElementsByTagName('tbody')[0];

    // Sample data
    const medicines = [
        { name: 'Paracetamol', price: '10', prescriptionNeeded: 'No', inStock: 'Yes', itemCount: '50' },
        // Add more medicine data here
    ];

    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value;
        updateSuggestions(searchText);
    });

    document.getElementById('searchButton').addEventListener('click', () => {
        const searchText = searchInput.value;
        updateTable(searchText);
    });

    function updateSuggestions(searchText) {
        if (searchText.length >= 3) {
            const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchText.toLowerCase()));
            suggestionBox.innerHTML = filteredMedicines.map(medicine => `<div class="suggestion-item">${medicine.name}</div>`).join('');
            suggestionBox.style.display = 'block';
            addSuggestionEventListeners();
        } else {
            suggestionBox.innerHTML = '';
            suggestionBox.style.display = 'none';
        }
    }

    function addSuggestionEventListeners() {
        const suggestionItems = document.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', (e) => {
                searchInput.value = e.target.textContent;
                suggestionBox.style.display = 'none';
                updateTable(searchInput.value);
            });
        });
    }

    function updateTable(searchText) {
        const filteredMedicines = medicines.filter(medicine => medicine.name.toLowerCase().includes(searchText.toLowerCase()));
        medicineTable.innerHTML = filteredMedicines.map(medicine => `
            <tr>
                <td>${medicine.name}</td>
                <td>${medicine.price}</td>
                <td>${medicine.prescriptionNeeded}</td>
                <td>${medicine.inStock}</td>
                <td>${medicine.itemCount}</td>
            </tr>
        `).join('');
    }
});
