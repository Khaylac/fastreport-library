function getReportId() {

    const parameters =
        new URLSearchParams(window.location.search);

    return parameters.get("id");

}


function findReport(id) {

    return reports.find(function(report) {

        return report.id === id;

    });

}


function createList(items) {

    let html = "<ul>";

    items.forEach(function(item) {

        html += `
            <li>${item}</li>
        `;

    });

    html += "</ul>";

    return html;

}


function createCarousel(report) {

    const images = report.images;


    if (images.length === 0) {

        return "";

    }


    let indicators = "";


    if (images.length > 1) {

        images.forEach(function(image, index) {

            indicators += `

                <button
                    class="carousel-indicator ${
                        index === 0 ? "active" : ""
                    }"
                    data-index="${index}"
                    aria-label="Show image ${index + 1}"
                >
                </button>

            `;

        });

    }


    const navigation =

        images.length > 1

            ? `

                <button
                    class="carousel-button carousel-prev"
                    aria-label="Previous image"
                >
                    ←
                </button>


                <button
                    class="carousel-button carousel-next"
                    aria-label="Next image"
                >
                    →
                </button>

            `

            : "";


    return `

        <div class="report-carousel">

            <div class="carousel-image-container">

                <img
                    id="carousel-image"
                    src="reports/${report.folder}/${images[0]}"
                    alt="${report.name} Preview"
                >

                ${navigation}

            </div>


            <div class="carousel-indicators">

                ${indicators}

            </div>

        </div>

    `;

}


function setupCarousel(report) {

    if (report.images.length <= 1) {

        return;

    }


    let currentImage = 0;


    const image =
        document.getElementById("carousel-image");


    const previousButton =
        document.querySelector(".carousel-prev");


    const nextButton =
        document.querySelector(".carousel-next");


    const indicators =
        document.querySelectorAll(
            ".carousel-indicator"
        );


    function showImage(index) {

        currentImage = index;


        image.src =
            `reports/${report.folder}/${report.images[index]}`;


        indicators.forEach(function(indicator) {

            indicator.classList.remove(
                "active"
            );

        });


        indicators[index].classList.add(
            "active"
        );

    }


    previousButton.addEventListener(
        "click",
        function() {

            let newIndex =
                currentImage - 1;


            if (newIndex < 0) {

                newIndex =
                    report.images.length - 1;

            }


            showImage(newIndex);

        }
    );


    nextButton.addEventListener(
        "click",
        function() {

            let newIndex =
                currentImage + 1;


            if (
                newIndex >=
                report.images.length
            ) {

                newIndex = 0;

            }


            showImage(newIndex);

        }
    );


    indicators.forEach(function(indicator) {

        indicator.addEventListener(
            "click",
            function() {

                const index =
                    Number(
                        indicator.dataset.index
                    );


                showImage(index);

            }
        );

    });

}


function loadReport() {

    const reportId =
        getReportId();


    const report =
        findReport(reportId);


    const container =
        document.getElementById(
            "report-details"
        );


    if (!report) {

        container.innerHTML = `

            <h1>
                Report not found
            </h1>

            <p>
                The report you are looking for does not exist.
            </p>

        `;

        return;

    }


    document.title =
        report.name + " - FastReport Library";


    container.innerHTML = `

        <section class="report-header">

            <div class="report-header-info">

                <div class="report-meta">

                    <span class="category">
                        ${report.category.toUpperCase()}
                    </span>

                    <span class="version">
                        v${report.version}
                    </span>

                </div>


                <h1>
                    ${report.name}
                </h1>


                <p class="report-full-description">
                    ${report.description}
                </p>


                <div class="report-updated">

                    Updated: ${report.updated}

                </div>


                <div class="buttons">

                    <a
                        href="reports/${report.folder}/example.pdf"
                        target="_blank"
                        class="button button-details"
                    >
                        Preview PDF
                    </a>


                    <a
                        href="reports/${report.folder}/report.fr3"
                        download
                        class="button button-download"
                    >
                        Download FR3
                    </a>

                </div>

            </div>


            <div class="report-large-preview">

                ${createCarousel(report)}

            </div>

        </section>


        <section class="report-details-grid">


            <div class="report-details-section">

                <h2>
                    Features
                </h2>

                ${createList(report.features)}

            </div>


            <div class="report-details-section">

                <h2>
                    Requirements
                </h2>

                ${createList(report.requirements)}

            </div>


            <div class="report-details-section">

                <h2>
                    Parameters
                </h2>

                ${createList(report.parameters)}

            </div>


        </section>

    `;


    setupCarousel(report);

}


loadReport();
