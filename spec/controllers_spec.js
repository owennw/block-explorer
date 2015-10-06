(function() {
  'use strict';

  describe('BlockExplorer controllers', function() {

    describe('BlockCtrl', function() {
      var ctrl, $httpBackend;

      beforeEach(module('blockChainExplorer'));
      beforeEach(inject(function(_$httpBackend_, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('blocks/blocks.json')
          .respond([
            {hash: 'a1'},
            {hash: 'a2'},
            {hash: 'a3'},
            {hash: 'a4'},
            {hash: 'a5'},
            {hash: 'b1'},
            {hash: 'b2'},
            {hash: 'b3'},
            {hash: 'b4'},
            {hash: 'b5'},
          ]);

        ctrl = $controller('BlockCtrl', []);
      }));

      it('should create "blocks" model with 2 blocks fetched from xhr', function() {
        expect(ctrl.blocks).toBeUndefined();
        $httpBackend.flush();

        expect(ctrl.blocks).toEqual([
          {hash: 'a1'},
          {hash: 'a2'},
          {hash: 'a3'},
          {hash: 'a4'},
          {hash: 'a5'},
          {hash: 'b1'},
          {hash: 'b2'},
          {hash: 'b3'},
          {hash: 'b4'},
          {hash: 'b5'}
        ]);

        expect(ctrl.splitBlocks).toEqual([
          [{hash: 'a1'}, {hash: 'a2'}, {hash: 'a3'}, {hash: 'a4'}, {hash: 'a5'}],
          [{hash: 'b1'}, {hash: 'b2'}, {hash: 'b3'}, {hash: 'b4'}, {hash: 'b5'}]
        ]);
      });
    });
  });
})();