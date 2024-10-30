$(function () {
    let input1;
    let input2;
    let operasiSelected = null;

    function updateTemporer() {
        let tampilan = "";
        if (input1) tampilan += input1;
        if (operasiSelected) tampilan += " " + operasiSelected;
        if (input2) tampilan += " " + input2;
        
        $("#hasil-temporer").text(tampilan || "...");
    }

    $(".tombol-angka").click(function () {
        let angka = $(this).text();
        
        if (operasiSelected == null) {
            let angkaSebelumnya = $("#input1").text();
            if (angkaSebelumnya == "...") angkaSebelumnya = "";
            input1 = angkaSebelumnya + angka;
            $("#input1").text(input1);
        } else {
            let angkaSebelumnya = $("#input2").text();
            if (angkaSebelumnya == "...") angkaSebelumnya = "";
            input2 = angkaSebelumnya + angka;
            $("#input2").text(input2);
        }
        updateTemporer();
    });

    $(".tombol-operasi").click(function () {
        let operasiSebelumnya = $("#operasi-selected").text();
        let newOperasi = $(this).text();
        if (operasiSebelumnya == "...") {
            operasiSelected = newOperasi;
            $("#operasi-selected").text(operasiSelected);
            updateTemporer();
        }
    });

    $(".tombol-clear").click(function () {
        input1 = "";
        input2 = "";
        operasiSelected = null;
        $("#input1").text("...");
        $("#input2").text("...");
        $("#operasi-selected").text("...");
        $("#hasil").text("hasil");
        $("#hasil-temporer").text("...");
    });

    $("#btn-hitung").click(function () {
        if (input1 && input2 && operasiSelected) {
            let hasil;
            let num1 = parseFloat(input1);
            let num2 = parseFloat(input2);

            switch (operasiSelected) {
                case "+":
                    hasil = num1 + num2;
                    break;
                case "-":
                    hasil = num1 - num2;
                    break;
                case "x":
                    hasil = num1 * num2;
                    break;
                case "/":
                    hasil = num1 / num2;
                    break;
                case "^":
                    hasil = Math.pow(num1, num2);
                    break;
                case "%":
                    hasil = num1 % num2;
                    break;
            }

            $("#hasil").text(hasil);
            $("#hasil-temporer").text(hasil);
            
            // Reset input tanpa menyimpan hasil ke input1
            input1 = "";
            input2 = "";
            operasiSelected = null;
            $("#input1").text("...");
            $("#input2").text("...");
            $("#operasi-selected").text("...");
        }
    });

    $(".toggle-negatif").click(function () {
        if (operasiSelected == null && input1) {
            input1 = -parseFloat(input1);
            $("#input1").text(input1);
            updateTemporer();
        } else if (operasiSelected && input2) {
            input2 = -parseFloat(input2);
            $("#input2").text(input2);
            updateTemporer();
        }
    });

    $(".tombol-faktorial").click(function () {
        if (operasiSelected == null && input1) {
            let num = parseInt(input1);
            if (num >= 0) {
                let hasil = 1;
                for (let i = 2; i <= num; i++) {
                    hasil *= i;
                }
                input1 = hasil;
                $("#input1").text(hasil);
                updateTemporer();
            }
        }
    });

    $(".decimal").click(function () {
        if (operasiSelected == null) {
            if (input1 && !input1.includes('.')) {
                input1 += '.';
                $("#input1").text(input1);
            } else if (!input1) {
                input1 = '0.';
                $("#input1").text(input1);
            }
        } else {
            if (input2 && !input2.includes('.')) {
                input2 += '.';
                $("#input2").text(input2);
            } else if (!input2) {
                input2 = '0.';
                $("#input2").text(input2);
            }
        }
        updateTemporer();
    });
});