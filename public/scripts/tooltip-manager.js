define("tooltip-manager", ["jquery", "logger"], function ($, logger) {
  var TooltipManager = function () {
    var privateMembers = {
      log: logger.get("tooltip-manager"),
      tooltipTemplate: function (id, top, left, message) {
        return (
          '<div id="' +
          id +
          '" class="tooltip fade right in" style="top: ' +
          top +
          "px; left: " +
          left +
          'px; display: none;">' +
          '<div class="tooltip-arrow"></div>' +
          '<div class="tooltip-inner">' +
          '<div style="float: right; padding: 2px 2px 2px 2px;" class="tooltipClose"> X </div>' +
          '<div style="padding: 12px 5px 2px 5px;">' +
          message +
          "</div>" +
          "</div>" +
          "</div>"
        );
      },
      generateUniqueId: function () {
        return "tooltip-" + Math.random().toString(36).substr(2, 9);
      },
      showTooltip: function (message, event) {
        this.closeTooltip(); // Close previous tooltips if any

        // Assuming the targeting a div with an id of "tooltipTarget"
        var targetElement = document.getElementById("tooltipTarget");
        var rect = targetElement.getBoundingClientRect();

        // Calculate position; adjust as needed for your specific case
        var topPos = rect.top + window.scrollY + rect.height; // Position below the target element
        var leftPos = rect.left + window.scrollX; // Align with the left edge of the target element

        var uniqueId = this.generateUniqueId();

        var tooltipFinalTemplate = this.tooltipTemplate(
          uniqueId,
          topPos,
          leftPos,
          message
        );

        $("body").append(tooltipFinalTemplate);
        $("#" + uniqueId).fadeIn();

        // Use event delegation for close button
        $("body")
          .off("click", ".tooltipClose")
          .on("click", ".tooltipClose", function () {
            $("#" + uniqueId).fadeOut(function () {
              $(this).remove();
            });
          });
      },
      closeTooltip: function () {
        $(".tooltip").remove(); // Remove all tooltips
      },
    };

    this.showTooltip = function (message, event) {
      privateMembers.showTooltip.call(privateMembers, message, event);
    };

    this.closeTooltip = function () {
      privateMembers.closeTooltip.call(privateMembers);
    };
  };
  return new TooltipManager();
});
