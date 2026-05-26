/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Student {
  id: number;
  name: string;
  role: string;
  wish: string;
  detailedWish: string;
  friendshipMemory: string;
  avatarColor: string; // Tailwind class color or hex code
  position: { x: number; y: number; z: number };
}

export interface ClassMemory {
  id: number;
  title: string;
  description: string;
  category: 'friendship' | 'school' | 'dream' | 'success';
  glowingColor: string; // hex or RGB for canvas rendering
  orbitRadius: number;
  orbitSpeed: number;
  scale: number;
}
