module.exports =  async (page, url, formData) => {
  const formDataEntries = formData.entries();

  let formHtml = '';

  for (const [name, value] of formDataEntries) {
    formHtml += `
      <input
        type='hidden'
        name='${name}'
        value='${value}'
      />
    `;
  }

  formHtml = `
    <form action='${url}' method='post'>

      <input type="hidden" id="stadiumId" name="stadiumId" value="1">
      <input type="hidden" id="matchId" name="matchId" value="28">
      <input type="hidden" id="matchName" name="matchName" value="ĐTQG Việt Nam - ĐTQG Malaysia">
      <input type="hidden" id="matchDate" name="matchDate" value="2018-12-15">
      <input type="hidden" id="matchTime" name="matchTime" value="19:30">
      <input type="hidden" id="stadiumName" name="stadiumName" value="SVĐ Quốc gia Mỹ Đình">
      ${formHtml}
      <input type='submit' />
    </form>
  `;

  await page.setContent(formHtml);
  const inputElement = await page.$('input[type=submit]');
  await inputElement.click();
};
