var gridTestUtils = require('../../test/e2e/gridTestUtils.spec.js');
it('grid should have four visible rows and 4 columns', function () {
  gridTestUtils.expectRowCount( 'grid2', 4 );
  gridTestUtils.expectHeaderColumnCount( 'grid2', 4 );
});

it('headers as specified', function () {
  gridTestUtils.expectHeaderCellValueMatch( 'grid2', 0, 'Exam' );
  gridTestUtils.expectHeaderCellValueMatch( 'grid2', 1, 'Possible Exam' );
  gridTestUtils.expectHeaderCellValueMatch( 'grid2', 2, 'Actual Exam' );
  gridTestUtils.expectHeaderCellValueMatch( 'grid2', 3, 'Percentage' );
});

it('row values should be as expected', function () {
  gridTestUtils.expectRowValuesMatch( 'grid2', 0, [ 'Basic Trig', '105', '77', '73%' ]);
  gridTestUtils.expectRowValuesMatch( 'grid2', 1, [ 'Graph Theory', '85', '82', '96%' ]);
  gridTestUtils.expectRowValuesMatch( 'grid2', 2, [ 'Counting', '40', '12', '30%' ]);
});
