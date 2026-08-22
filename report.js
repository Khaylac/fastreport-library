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
                    aria-label="Mostrar imagem ${index + 1}"
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
                    aria-label="Imagem anterior"
                >
                    ←
                </button>


                <button
                    class="carousel-button carousel-next"
                    aria-label="Próxima imagem"
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
                    title="Clique para ampliar"
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

        setupImageModal();

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
        function(event) {

            event.stopPropagation();


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
        function(event) {

            event.stopPropagation();


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


    setupImageModal();

}


function setupImageModal() {

    const image =
        document.getElementById("carousel-image");


    image.addEventListener(
        "click",
        function() {

            const modal =
                document.createElement("div");


            modal.className =
                "image-modal";


            modal.innerHTML = `

                <button
                    class="image-modal-close"
                    aria-label="Fechar imagem"
                >
                    ×
                </button>


                <img
                    src="${image.src}"
                    alt="${image.alt}"
                >

            `;


            document.body.appendChild(
                modal
            );


            modal.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target === modal
                    ) {

                        modal.remove();

                    }

                }
            );


            modal
                .querySelector(
                    ".image-modal-close"
                )
                .addEventListener(
                    "click",
                    function() {

                        modal.remove();

                    }
                );

        }
    );

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
                Relatório não encontrado
            </h1>

            <p>
                O relatório que você está procurando não existe.
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

                    ${
                        report.screen
                            ? `
                                <span class="screen">
                                    ${report.screen}
                                </span>
                            `
                            : ""
                    }


                    <span class="type">

                        ${
                            report.type
                                ? report.type
                                : "Sem classificação"
                        }

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

                    Atualizado em: ${report.updated}

                </div>


                <div class="buttons">

                    <a
                        href="reports/${report.folder}/example.pdf"
                        target="_blank"
                        class="button button-details"
                    >
                        Visualizar PDF
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
                    Recursos
                </h2>

                ${createList(report.features)}

            </div>


            <div class="report-details-section">

                <h2>
                    Requisitos
                </h2>

                ${createList(report.requirements)}

            </div>


            <div class="report-details-section">

                <h2>
                    Parâmetros
                </h2>

                ${createList(report.parameters)}

            </div>


        </section>

    `;


    setupCarousel(report);

}


loadReport();
