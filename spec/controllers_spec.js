(function() {
  'use strict';

  describe('BlockExplorer controllers', function() {

    describe('BlockCtrl', function() {
      var ctrl, $httpBackend;

      beforeEach(module('blockChainExplorer'));
      beforeEach(inject(function(_$httpBackend_, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('blocks/blocks.json')
          .respond([{hash: '1234abcd'}, {hash: 'abcd1234'}]);

        ctrl = $controller('BlockCtrl', []);
      }));

      it('should create "blocks" model with 2 blocks fetched from xhr', function() {
        expect(ctrl.blocks).toBeUndefined();
        $httpBackend.flush();

        expect(ctrl.blocks).toEqual([{hash: '1234abcd'}, {hash: 'abcd1234'}]);
      });
    });
  });
})();