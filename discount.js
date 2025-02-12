function calculateFare() {
    let baseFare = parseFloat(document.getElementById('basefare').value) || 0;
    let gst = parseFloat(document.getElementById('gst').value) / 100 || 0;
    let discountRate = parseFloat(document.getElementById('discount').value) / 100 || 0;

    let rates = [
        parseFloat(document.getElementById('rate1_5').value) || 0,
        parseFloat(document.getElementById('rate6_10').value) || 0,
        parseFloat(document.getElementById('rate11_15').value) || 0,
        parseFloat(document.getElementById('rate16_20').value) || 0
    ];

    let caps = [
        parseFloat(document.getElementById('cap1_5').value) || 0,
        parseFloat(document.getElementById('cap6_10').value) || 0,
        parseFloat(document.getElementById('cap11_15').value) || 0,
        parseFloat(document.getElementById('cap16_20').value) || 0
    ];

    let tableBody = document.getElementById('fareTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = "";

    for (let km = 1; km <= 20; km++) {
        let rateIndex = km <= 5 ? 0 : km <= 10 ? 1 : km <= 15 ? 2 : 3;
        let pricePerKm = rates[rateIndex];
        let totalFare = baseFare + (km > 2 ? (km - 2) * pricePerKm : 0);
        let gstAmount = totalFare * gst;
        let discount = Math.min(totalFare * discountRate, caps[rateIndex]);
        let finalFare = totalFare + gstAmount - discount;

        // Ensure minimum fare does not go negative & round to whole numbers
        finalFare = Math.max(Math.round(finalFare), 0);

        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${km}</td>
            <td>${Math.round(baseFare)}</td>
            <td>${Math.round(pricePerKm)}</td>
            <td>${Math.round(gstAmount)}</td>
            <td>${Math.round(discount)}</td>
            <td>${Math.round(caps[rateIndex])}</td>
            <td>${finalFare}</td>
        `;
    }
}
