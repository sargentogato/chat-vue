// sum.test.js
import { expect, test, describe } from 'vitest';
import { sum, addArray } from '../../src/helpers/sum';

describe( 'add Function', () => {
  test( 'adds 1 + 2 to equal 3', () => {
    //Arrange, Act, Assert
    const a = 4;
    const b = 8;

    const result = sum( a, b );

    expect( result ).toBe( a + b );
  } );
} );


describe( 'addArray', () => {
  test( 'Should return a number if the array has numbers', () => {
    //Arrange
    const arrayOfNumbers = [1, 2, 3, 4, 5];

    //Act
    const result = addArray( arrayOfNumbers );

    //Assert
    expect( result ).toBe( 15 );
  } );

  test( 'Should return 0 if the array is empty', () => {
    //Arrange
    const arrayOfNumbers = [];

    //Act
    const result = addArray( arrayOfNumbers );
    console.log( { result } );


    //Assert
    expect( result ).toBe( 0 );
  } );
} );
