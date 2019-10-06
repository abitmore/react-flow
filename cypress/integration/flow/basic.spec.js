describe('Basic Flow Rendering', () => {
  it('renders a flow with three nodes', () => {
    cy.visit('/index.html');

    cy.get('.react-flow__renderer');
    cy.get('.react-flow__node').should('have.length', 4);
    cy.get('.react-flow__edge').should('have.length', 2);
    cy.get('.react-flow__node').children('div').children('.react-flow__handle');
  });

  it('selects a node', () => {
    cy.get('.react-flow__node:first').click().should('have.class', 'selected');
  });

  it('deselects node', () => {
    cy.get('.react-flow__renderer').click('bottomRight');
    cy.get('.react-flow__node:first').should('not.have.class', 'selected');
  });

  it('selects an edge', () => {
    cy.get('.react-flow__edge:first').click().should('have.class', 'selected');
  });

  it('deselects edge', () => {
    cy.get('.react-flow__renderer').click('bottomRight');
    cy.get('.react-flow__edge:first').should('not.have.class', 'selected');
  });

  it('selects all nodes', () => {
    cy.get('body')
      .type('{shift}', { release: false })
      .get('.react-flow__selectionpane')
      .trigger('mousedown', 'topLeft', { which: 1, force: true })
      .trigger('mousemove', 'bottomRight', { which: 1 })
      .trigger('mouseup', 'bottomRight', { force: true })
      .get('.react-flow__node')
      .should('have.class', 'selected')
      .get('.react-flow__nodesselection-rect');
  });

  it('removes selection', () => {
    cy.get('.react-flow__renderer').click('bottomRight');
    cy.get('.react-flow__nodesselection-rect').should('not.exist');
  });

  it('selects an edge', () => {
    cy.get('.react-flow__edge:first').click().should('have.class', 'selected');
  });

  it('drags a node', () => {
    const styleBeforeDrag = Cypress.$('.react-flow__node:first').css('transform');

    cy.drag('.react-flow__node:first', { x: 500, y: 25 })
      .then($el => {
        const styleAfterDrag = $el.css('transform');
        expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
      });
  });

  it('removes a node', () => {
    cy.get('.react-flow__node').contains('Node 2').click();
    cy.get('body').type('{backspace}');

    cy.get('.react-flow__node').should('have.length', 3);
    cy.get('.react-flow__edge').should('have.length', 1);
  });

  it('connects nodes', () => {
    cy.get('.react-flow__node')
      .contains('Node 3')
      .find('.react-flow__handle.source')
      .trigger('mousedown', { which: 1 });

    cy.get('.react-flow__node')
      .contains('Node 4')
      .find('.react-flow__handle.target')
      .trigger('mousemove')
      .trigger('mouseup', { force: true });

    cy.get('.react-flow__edge').should('have.length', 2);
  });

  it('removes an edge', () => {
    cy.get('.react-flow__edge:first').click();
    cy.get('body').type('{backspace}');

    cy.get('.react-flow__edge').should('have.length', 1);
  });

  it('drags the pane', () => {
    // for d3 we have to pass the window to the event
    // https://github.com/cypress-io/cypress/issues/3441

    const newPosition = {
      clientX: Cypress.config('viewportWidth') * 0.6,
      clientY: Cypress.config('viewportHeight') * 0.7
    };

    const styleBeforeDrag = Cypress.$('.react-flow__nodes').css('transform');

    cy.window().then((win) => {
      cy.get('.react-flow__zoompane')
        .trigger('mousedown', { which: 1, view: win })
        .trigger('mousemove', newPosition)
        .trigger('mouseup', { force: true, view: win })
        .then(() => {
          const styleAfterDrag = Cypress.$('.react-flow__nodes').css('transform');
          expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
        });
    });
  });

  it('zooms the pane', () => {
    const styleBeforeZoom = Cypress.$('.react-flow__nodes').css('transform');

    cy.get('.react-flow__zoompane')
      .trigger('wheel','topLeft', { deltaY: -200 })
      .then(() => {
        const styleAfterZoom = Cypress.$('.react-flow__nodes').css('transform');
        expect(styleBeforeZoom).to.not.equal(styleAfterZoom);
      });
  });
});