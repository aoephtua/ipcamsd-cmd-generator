/*
Copyright (c) 2021, Thorsten A. Weintz. All rights reserved.
Licensed under the MIT license. See LICENSE in the project root for license information.
*/

export function getUniqueIdentifier(prefix) {
    return (prefix || '') + Math.random()
        .toString(16)
        .slice(2);
}
