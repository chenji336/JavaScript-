function phone() {
    const reg = /^1(3[0-9]|4[579]|5[0-35-9]|66|7[0135678]|8[0-9]|9[8-9])\d{8}$/;
    console.log(reg.test('18503007522'));
}
phone();