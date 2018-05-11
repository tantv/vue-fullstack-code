import {shallow} from 'vue-test-utils';
import App from '@/App';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(App);
  });

  it('should render correct contents', () => {
    expect(wrapper.html()).to.contain('<th>Items</th>');
    expect(wrapper.html()).to.contain(
      '<input type="text" placeholder="Add item..." value="" class="prompt">'
    );
    expect(wrapper.html()).to.contain(
      '<button type="submit" disabled="disabled" class="ui button">Add</button>'
    );
    expect(wrapper.html()).to.contain(
      '<span class="ui label">Remove all</span>'
    );
  });

  it('should set correct default data', () => {
    expect(wrapper.vm.item).to.equal('');
    expect(wrapper.vm.items).to.deep.equal([]);
  });

  it('should have the "Add" button disabled', () => {
    const addItemButton = wrapper.find('.ui.button');
    expect(addItemButton.element.disabled).to.be.true;
  });

  describe('the user populates the text input field', () => {
    let inputField;

    beforeEach(() => {
      inputField = wrapper.find('input');
      inputField.element.value = 'New Item';
      inputField.trigger('input');
    });

    it('should update the "text" data property', () => {
      expect(wrapper.vm.item).to.equal('New Item');
    });

    it('should enable the "Add" button when text input is populated', () => {
      const addItemButton = wrapper.find(' .ui.button');
      expect(addItemButton.element.disabled).to.be.false;
    });

    describe('and then clears the input', () => {
      it('should disable the "Add" button', () => {
        const addItemButton = wrapper.find(' .ui.button');
        inputField.element.value = '';
        inputField.trigger('input');

        expect(addItemButton.element.disabled).to.be.true;
      });
    });

    describe('and then submits the form', () => {
      let addItemButton;
      let itemList;
      let inputField;

      beforeEach(() => {
        addItemButton = wrapper.find('.ui.button');
        itemList = wrapper.find(' .item-list');
        inputField = wrapper.find('input');

        wrapper.setData({item: 'New Item'});
        addItemButton.trigger('click');
      });

      it('should add a new item to the "items" data property', () => {
        expect(wrapper.vm.items).to.contain('New Item');
        expect(itemList.html()).to.contain('<td>New Item</td>');
      });

      it('should set the "item" data property to a blank string', () => {
        expect(wrapper.vm.item).to.equal('');
        expect(inputField.element.value).to.equal('');
      });

      it('should disable the "Add" button', () => {
        expect(addItemButton.element.disabled).to.be.true;
      });
    });
  });

  describe('the user clics the "Remove all" label', () => {
    let itemList;
    let removeItemsLabel;

    beforeEach(() => {
      itemList = wrapper.find(' .item-list');
      removeItemsLabel = wrapper.find(' .ui.label');

      wrapper.setData({items: ['Item #1', 'Item #2', 'Item #3']});
    });

    it('should remove all items from the "items" data property.', () => {
      removeItemsLabel.trigger('click');

      expect(wrapper.vm.items).to.deep.equal([]);
      expect(itemList.html()).to.not.contain('<td>Item #1</td>');
      expect(itemList.html()).to.not.contain('<td>Item #2</td>');
      expect(itemList.html()).to.not.contain('<td>Item #3</td>');
    })
  });
});
