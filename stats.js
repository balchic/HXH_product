document.addEventListener('DOMContentLoaded', () => {

    const sampleLottoData = [
        { round: 1101, numbers: [2, 11, 19, 23, 25, 34], bonus: 45 }, { round: 1100, numbers: [5, 10, 13, 22, 38, 41], bonus: 7 },
        { round: 1099, numbers: [1, 4, 15, 21, 33, 44], bonus: 12 }, { round: 1098, numbers: [7, 8, 16, 25, 35, 42], bonus: 23 },
        { round: 1097, numbers: [3, 14, 22, 28, 30, 39], bonus: 11 }, { round: 1096, numbers: [6, 12, 18, 24, 36, 40], bonus: 1 },
        { round: 1095, numbers: [1, 4, 10, 29, 38, 45], bonus: 17 }, { round: 1094, numbers: [8, 13, 19, 27, 40, 45], bonus: 20 },
        { round: 1093, numbers: [7, 14, 21, 28, 35, 42], bonus: 2 }, { round: 1092, numbers: [2, 17, 26, 35, 36, 43], bonus: 11 },
        { round: 1091, numbers: [1, 5, 12, 21, 23, 39], bonus: 8 }, { round: 1090, numbers: [10, 16, 19, 32, 33, 38], bonus: 3 },
        { round: 1089, numbers: [4, 11, 23, 33, 38, 40], bonus: 30 }, { round: 1088, numbers: [9, 13, 20, 28, 38, 41], bonus: 5 },
        { round: 1087, numbers: [6, 14, 30, 31, 40, 41], bonus: 29 }, { round: 1086, numbers: [1, 15, 20, 25, 30, 45], bonus: 44 },
        { round: 1085, numbers: [3, 13, 23, 33, 38, 43], bonus: 21 }, { round: 1084, numbers: [1, 7, 22, 33, 35, 42], bonus: 10 },
        { round: 1083, numbers: [5, 20, 26, 28, 34, 43], bonus: 15 }, { round: 1082, numbers: [11, 22, 28, 32, 40, 42], bonus: 37 },
    ];

    const color = n => n <= 10 ? 'yellow' : n <= 20 ? 'blue' : n <= 30 ? 'red' : n <= 40 ? 'gray' : 'green';

    function calculateFrequencies() {
        const frequencies = {};
        for (let i = 1; i <= 45; i++) {
            frequencies[i] = 0;
        }

        sampleLottoData.forEach(draw => {
            draw.numbers.forEach(num => {
                frequencies[num]++;
            });
            // Also count bonus number
            frequencies[draw.bonus]++;
        });

        return frequencies;
    }

    function renderHotAndCold(frequencies) {
        const hotDiv = document.getElementById('hot-numbers');
        const coldDiv = document.getElementById('cold-numbers');
        hotDiv.innerHTML = '';
        coldDiv.innerHTML = '';

        const sortedFreq = Object.entries(frequencies).sort((a, b) => b[1] - a[1]);
        
        const hotNumbers = sortedFreq.slice(0, 5);
        const coldNumbers = sortedFreq.slice(-5).reverse();

        hotNumbers.forEach(([num]) => {
            const b = document.createElement("div");
            b.className = `ball ${color(num)}`;
            b.textContent = num;
            hotDiv.appendChild(b);
        });

        coldNumbers.forEach(([num]) => {
            const b = document.createElement("div");
            b.className = `ball ${color(num)}`;
            b.textContent = num;
            coldDiv.appendChild(b);
        });
    }

    function renderFrequencyChart(frequencies) {
        const chartDiv = document.getElementById('frequency-chart');
        chartDiv.innerHTML = '';
        const maxFreq = Math.max(...Object.values(frequencies));

        for (let i = 1; i <= 45; i++) {
            const barContainer = document.createElement('div');
            barContainer.className = 'bar-container';

            const bar = document.createElement('div');
            bar.className = `bar ${color(i)}`;
            const height = (frequencies[i] / maxFreq) * 100;
            bar.style.height = `${height}%`;
            bar.title = `번호 ${i}: ${frequencies[i]}회`;

            const label = document.createElement('span');
            label.className = 'bar-label';
            label.textContent = i;
            
            barContainer.appendChild(bar);
            barContainer.appendChild(label);
            chartDiv.appendChild(barContainer);
        }
    }

    const frequencies = calculateFrequencies();
    renderHotAndCold(frequencies);
    renderFrequencyChart(frequencies);
});