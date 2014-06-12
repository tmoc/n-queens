describe('solvers', function() {
  window.displayBoard = function() {};

  describe('findNRooksSolution()', function() {

    it('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionBoard = new Board(findNRooksSolution(n));

        expect(solutionBoard.get('n')).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function() {

    it('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function() {

    it('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        /*N-Queens has no valid boards for n=two and n=three
        //Rewrote tests to assume solution generator will only
        //reeturn valid boards, or Null iif there aren't any*/
        if (n === 2 || n === 3) {
          expect(findNQueensSolution(n)).to.be.equal(null);
        } else {
          var solutionBoard = new Board(findNQueensSolution(n));
          expect(solutionBoard.get('n')).to.equal(n);
          expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
        }
      });
    });

  });

  describe('countNQueensSolutions()', function() {

    it('finds the number of valid solutions for n of 0-8', function() {
      _.range(0, 9).map(function(n) {
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

});
