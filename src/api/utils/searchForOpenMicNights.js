function searchForOpenMicNights(containedText, $, tag) {
  const micNights = $(`${tag}:contains(${containedText})`);
  const customErrorMessage = `There were no mic nights found with these details: ${containedText}.`;

  if (micNights.length < 1) { throw new Error(customErrorMessage) }

  return micNights;
}

module.exports = searchForOpenMicNights;
