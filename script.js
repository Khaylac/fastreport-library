function createReportCard(report) {

    let preview;

    if (report.folder) {

        preview = `
            <img
                src="reports/${report.folder}/preview.png"
                alt="${report.name} Preview"
            >
        `;

    } else {

        preview = `
            Report Preview
        `;

    }


    let buttons;

    if (report.folder) {

        buttons = `
            <div class="buttons">

                <a
                    href="reports/${report.folder}/example.pdf"
                    target="_blank"
                    class="button button-preview"
                >
                    Preview
                </a>

                <a
                    href="reports/${report.folder}/report.fr3"
                    download
                    class="button button-download"
                >
                    Download FR3
                </a>

            </div>
        `;

    } else {

        buttons = `
            <div class="buttons">

                <a
                    href="#"
                    class="button button-preview"
                >
                    Preview
                </a>

                <a
                    href="#"
                    class="button button-download"
                >
                    Download FR3
                </a>

            </div>
        `;

    }


    return `

        <div class="report-card">

            <div class="report-preview">

                ${preview}

            </div>


            <div class="report-content">

                <span class="category">
                    ${report.category.toUpperCase()}
                </span>


                <h3>
                    ${report.name}
                </h3>


                <p>
                    ${report.description}
                </p>


                ${buttons}

            </div>

        </div>

    `;

}


function loadReports() {

    const reportGrid =
        document.getElementById("report-grid");


    reports.forEach(function(report) {

        reportGrid.innerHTML +=
            createReportCard(report);

    });

}


loadReports();
