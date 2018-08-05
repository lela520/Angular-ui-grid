var gridTestUtils = require('../../test/e2e/gridTestUtils.spec.js');
it('grid should have four visible rows and one column', function () {
  gridTestUtils.expectRowCount( 'grid1', 4 );
  gridTestUtils.expectHeaderColumnCount( 'grid1', 1 );
});

it('headers as specified', function () {
  gridTestUtils.expectHeaderCellValueMatch( 'grid1', 0, 'Name' );
});

it('row values should be as expected', function () {
  gridTestUtils.expectRowValuesMatch( 'grid1', 0, [ 'John Rogers' ]);
  gridTestUtils.expectRowValuesMatch( 'grid1', 1, [ 'David Michaels' ]);
  gridTestUtils.expectRowValuesMatch( 'grid1', 2, [ 'Andrew Johnson' ]);
  gridTestUtils.expectRowValuesMatch( 'grid1', 3, [ 'Donald McDonald' ]);
});
