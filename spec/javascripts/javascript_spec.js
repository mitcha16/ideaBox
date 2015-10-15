describe('idea spec', function () {

  it('should find all .idea elements', function () {
    MagicLamp.load('ideas/index');
    assert.equal($('.ideas').length, 1);
  });

});
