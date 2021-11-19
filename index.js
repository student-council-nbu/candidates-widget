$(() => {
    const $detailsPlaceholder = $('.applicant-details .placeholder'); 
    const $detailsInfo = $('.applicant-details .info');

    $detailsPlaceholder.show();
    $detailsInfo.hide();

    $.get('data/applicants.json').then(applicants => {
        const $shadowList = $('<div>');

        applicants.forEach(applicant => {
            if (applicant.hidden) {
                return;
            }

            const $applicantContainer = $('<p>')
                .text(applicant.name)
                .addClass('applicant')
                .attr('student-id', applicant.id)

            $applicantContainer.appendTo($shadowList);
        });

        const $applicantList = $('.applicant-list');
        $applicantList.append($shadowList.children());

        const $applicantImage = $('.applicant-details .info img');
        const $applicantName = $('.applicant-details .info .name');
        const $applicantProgram = $('.applicant-details .info .program');
        const $applicantMotivation = $('.applicant-details .info .motivation');
        const $applicantDetails = $('.applicant-details .info .details');


        $applicantList.on('click', '.applicant', function() {
            const $applicant = $(this);
            const applicantId = $applicant.attr('student-id');

            const applicant = applicants.find(applicant => applicant.id === applicantId);

            $detailsPlaceholder.hide();
            $detailsInfo.show();

            $('.selected').removeClass('selected');
            $applicant.addClass('selected');

            $applicantImage.attr('src', `images/${applicant.id}.jpg`);
            $applicantName.text(applicant.name);
            $applicantProgram.text(applicant.program);
            $applicantMotivation.text(applicant.motivation);
            $applicantDetails.text(applicant.details);           
        });
    })
})